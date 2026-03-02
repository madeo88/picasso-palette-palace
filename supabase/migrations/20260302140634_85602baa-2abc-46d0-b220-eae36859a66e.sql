
-- Create role enum
CREATE TYPE public.app_role AS ENUM ('admin');

-- Create comments table
CREATE TABLE public.comments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  author_name TEXT NOT NULL,
  comment_text TEXT NOT NULL,
  visible BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create user_roles table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  UNIQUE (user_id, role)
);

-- Enable RLS
ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Helper function: check if user is admin
CREATE OR REPLACE FUNCTION public.is_admin(_user_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = 'admin'
  )
$$;

-- Comments policies
-- Anyone can insert
CREATE POLICY "Anyone can insert comments"
ON public.comments FOR INSERT
WITH CHECK (author_name IS NOT NULL AND comment_text IS NOT NULL);

-- Anyone can see visible comments
CREATE POLICY "Anyone can see visible comments"
ON public.comments FOR SELECT
USING (visible = true OR public.is_admin(auth.uid()));

-- Admin can update (toggle visibility)
CREATE POLICY "Admins can update comments"
ON public.comments FOR UPDATE
USING (public.is_admin(auth.uid()));

-- Admin can delete
CREATE POLICY "Admins can delete comments"
ON public.comments FOR DELETE
USING (public.is_admin(auth.uid()));

-- User roles policies
CREATE POLICY "Admins can view roles"
ON public.user_roles FOR SELECT
USING (public.is_admin(auth.uid()));

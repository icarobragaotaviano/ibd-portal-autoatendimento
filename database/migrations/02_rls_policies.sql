-- IBD Client Portal 2026 — Row Level Security (RLS) Policies
-- Author: IBD Engineering

-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE prospects ENABLE ROW LEVEL SECURITY;
ALTER TABLE prospect_briefings ENABLE ROW LEVEL SECURITY;
ALTER TABLE proposals ENABLE ROW LEVEL SECURITY;
ALTER TABLE contracts ENABLE ROW LEVEL SECURITY;
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_materials ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_revisions ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_log ENABLE ROW LEVEL SECURITY;

-- Helper function: Check if current authenticated user is Admin
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM profiles
    WHERE auth_user_id = auth.uid()
    AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Helper function: Get client_id for current authenticated user
CREATE OR REPLACE FUNCTION get_current_client_id()
RETURNS TEXT AS $$
BEGIN
  RETURN (
    SELECT id FROM clients
    WHERE auth_user_id = auth.uid()
    AND portal_enabled = true
    LIMIT 1
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 1. PROFILES POLICIES
CREATE POLICY "Users can read own profile"
  ON profiles FOR SELECT
  USING (auth_user_id = auth.uid() OR is_admin());

CREATE POLICY "Admins can manage all profiles"
  ON profiles FOR ALL
  USING (is_admin());

-- 2. PROSPECTS & PROPOSALS & CONTRACTS POLICIES (Admin Only)
CREATE POLICY "Admins can manage prospects"
  ON prospects FOR ALL
  USING (is_admin());

CREATE POLICY "Public can insert prospects via lead flow"
  ON prospects FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admins can manage prospect briefings"
  ON prospect_briefings FOR ALL
  USING (is_admin());

CREATE POLICY "Public can insert and update own briefing"
  ON prospect_briefings FOR ALL
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Admins can manage proposals"
  ON proposals FOR ALL
  USING (is_admin());

CREATE POLICY "Admins can manage contracts"
  ON contracts FOR ALL
  USING (is_admin());

-- 3. CLIENTS POLICIES
CREATE POLICY "Clients can view own client record"
  ON clients FOR SELECT
  USING (auth_user_id = auth.uid() OR is_admin());

CREATE POLICY "Admins can manage all clients"
  ON clients FOR ALL
  USING (is_admin());

-- 4. PROJECTS POLICIES
CREATE POLICY "Clients can view own projects"
  ON projects FOR SELECT
  USING (client_id = get_current_client_id() OR is_admin());

CREATE POLICY "Clients can insert new project request"
  ON projects FOR INSERT
  WITH CHECK (client_id = get_current_client_id() OR is_admin());

CREATE POLICY "Admins can manage all projects"
  ON projects FOR ALL
  USING (is_admin());

-- 5. PROJECT MATERIALS POLICIES
CREATE POLICY "Clients can view and upload materials for own projects"
  ON project_materials FOR SELECT
  USING (
    project_id IN (SELECT id FROM projects WHERE client_id = get_current_client_id())
    OR is_admin()
  );

CREATE POLICY "Clients can insert materials for own projects"
  ON project_materials FOR INSERT
  WITH CHECK (
    project_id IN (SELECT id FROM projects WHERE client_id = get_current_client_id())
    OR is_admin()
  );

CREATE POLICY "Admins can manage all project materials"
  ON project_materials FOR ALL
  USING (is_admin());

-- 6. PROJECT REVISIONS POLICIES
CREATE POLICY "Clients can view revisions for own projects"
  ON project_revisions FOR SELECT
  USING (
    project_id IN (SELECT id FROM projects WHERE client_id = get_current_client_id())
    OR is_admin()
  );

CREATE POLICY "Clients can request revisions for own projects"
  ON project_revisions FOR INSERT
  WITH CHECK (
    project_id IN (SELECT id FROM projects WHERE client_id = get_current_client_id())
    OR is_admin()
  );

CREATE POLICY "Admins can manage all project revisions"
  ON project_revisions FOR ALL
  USING (is_admin());

-- 7. PROJECT MESSAGES POLICIES
CREATE POLICY "Clients can view messages for own projects"
  ON project_messages FOR SELECT
  USING (
    project_id IN (SELECT id FROM projects WHERE client_id = get_current_client_id())
    OR is_admin()
  );

CREATE POLICY "Clients can send messages to own projects"
  ON project_messages FOR INSERT
  WITH CHECK (
    project_id IN (SELECT id FROM projects WHERE client_id = get_current_client_id())
    OR is_admin()
  );

CREATE POLICY "Admins can manage all project messages"
  ON project_messages FOR ALL
  USING (is_admin());

-- 8. ACTIVITY LOG POLICIES
CREATE POLICY "Clients can view activities for own entities"
  ON activity_log FOR SELECT
  USING (
    is_admin()
    OR (
      entity_type = 'project'
      AND entity_id IN (SELECT id FROM projects WHERE client_id = get_current_client_id())
    )
  );

CREATE POLICY "Admins can manage all activity logs"
  ON activity_log FOR ALL
  USING (is_admin());

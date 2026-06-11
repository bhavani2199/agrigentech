
CREATE TABLE products (
  id               uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name             text NOT NULL,
  category         text NOT NULL CHECK (category IN ('vegetables', 'flowers')),
  description      text,
  image_url        text,
  price            numeric,
  unit             text,
  available        boolean NOT NULL DEFAULT true,
  price_updated_at timestamptz NOT NULL DEFAULT now(),
  created_at       timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "public_read_products" ON products
  FOR SELECT TO anon, authenticated USING (true);

CREATE POLICY "auth_insert_products" ON products
  FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "auth_update_products" ON products
  FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "auth_delete_products" ON products
  FOR DELETE TO authenticated USING (true);

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Product {
  id: string;
  name: string;
  category: 'vegetables' | 'flowers';
  description: string | null;
  image_url: string | null;
  price: number | null;
  unit: string | null;
  available: boolean;
  price_updated_at: string;
  created_at: string;
}

export async function getAllProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: true });
  if (error) throw error;
  return data as Product[];
}

export async function getProductsByCategory(
  category: 'vegetables' | 'flowers'
): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('category', category)
    .order('created_at', { ascending: true });
  if (error) throw error;
  return data as Product[];
}

export async function updateProductPrice(
  id: string,
  price: number,
  unit: string
): Promise<void> {
  const { error } = await supabase
    .from('products')
    .update({ price, unit, price_updated_at: new Date().toISOString() })
    .eq('id', id);
  if (error) throw error;
}

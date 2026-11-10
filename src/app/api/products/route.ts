import { NextResponse } from 'next/server';
import { API_PRODUCTS_RAW } from '@/modules/products/products.api';

export async function GET() {
  return NextResponse.json({
    items: API_PRODUCTS_RAW,
    total: API_PRODUCTS_RAW.length,
  });
}


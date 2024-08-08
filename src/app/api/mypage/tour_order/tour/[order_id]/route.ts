import { createClient } from '@/supabase/server';
import { NextRequest, NextResponse } from 'next/server';
import { TourOrderType } from '@/types/tour';

export async function GET(
  req: NextRequest,
  { params }: { params: { order_id: string } },
) {
  const { order_id } = params;
  const supabase = createClient();

  const { data: tourOrder, error: tourOrderError } = await supabase
    .from('tour_orders')
    .select('*')
    .eq('id', order_id)
    .single();

  if (tourOrderError) {
    return NextResponse.json({
      error: '여행상품 주문 목록을 불러올 수 없습니다.',
    });
  }

  const { data: tour, error: tourError } = await supabase
    .from('tours')
    .select('*')
    .eq('id', tourOrder.tour_id)
    .single();

  if (tourError) {
    return NextResponse.json({ error: '여행 상품 정보를 불러올 수 없습니다.' });
  }

  const { data: planet, error: planetError } = await supabase
    .from('planets')
    .select('*')
    .eq('id', tour.planet_id)
    .single();

  if (planetError) {
    return NextResponse.json({ error: '행성 정보를 불러올 수 없습니다.' });
  }

  const orderWithDetails = {
    ...tourOrder,
    tour,
    planet,
  };

  return NextResponse.json(orderWithDetails);
}

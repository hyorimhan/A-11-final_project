import { createClient } from '@/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const supabase = createClient();

  try {
    const { email, password } = await request.json();
    const {
      data: { user },
      error,
    } = await supabase.auth.signUp({ email, password });

    if (error) {
      if (
        error.status === 422 &&
        error.message.includes('already registered')
      ) {
        return NextResponse.json(
          { message: '이미 가입된 이메일입니다' },
          { status: 409 },
        );
      }

      return NextResponse.json(
        { message: '회원가입에 실패했습니다' },
        { status: 401 },
      );
    }

    return NextResponse.json({ message: '회원가입에 성공했습니다' });
  } catch (error) {
    return NextResponse.json(
      { message: '네트워크 오류가 발생했습니다' },
      { status: 500 },
    );
  }
}

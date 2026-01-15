import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { items, total, customer } = body;

    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!token || !chatId) {
      return NextResponse.json({ error: 'Missing Telegram Keys' }, { status: 500 });
    }

    const itemList = items.map((i: any) => `- ${i.name} ($${i.price})`).join('\n');

    // 1. UPDATED MESSAGE TEMPLATE WITH CONTACT INFO
    const message = `
📦 *NEW ORDER RECEIVED*
------------------------
${itemList}
------------------------
💰 *Total:* $${total}

👤 *Customer Info:*
Name: ${customer.firstName} ${customer.lastName}
Address: ${customer.address}
City: ${customer.city}, ${customer.zip}

📞 *Contact Details:*
Phone: ${customer.phone}
Email: ${customer.email}
Telegram: @${customer.telegram || 'N/A'}
    `;

    const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: 'Markdown',
      }),
    });

    if (!response.ok) {
      throw new Error('Telegram blocked the message');
    }

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error("Server Error:", error);
    return NextResponse.json({ error: 'Failed to send' }, { status: 500 });
  }
}
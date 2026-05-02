import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const { search } = new URL(req.url);
  const apiUrl = `http://20.207.122.201/evaluation-service/notifications${search}`;
  
  const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJzcmlha3NoYXlhX2tvZGFsaUBzcm1hcC5lZHUuaW4iLCJleHAiOjE3Nzc3MDk4MDEsImlhdCI6MTc3NzcwODkwMSwiaXNzIjoiQWZmb3JkIE1lZGljYWwgVGVjaG5vbG9naWVzIFByaXZhdGUgTGltaXRlZCIsImp0aSI6ImQzNzgzMTY5LWY1ODgtNDdjNC1hMWI3LWQ2N2YzODE2NjlkNCIsImxvY2FsZSI6ImVuLUlOIiwibmFtZSI6ImtvZGFsaSBzcmkgYWtzaGF5YSIsInN1YiI6Ijk1MjcxM2EzLThkYmEtNDM3Zi04NmE1LTc5NjkwNzFkOGY5OSJ9LCJlbWFpbCI6InNyaWFrc2hheWFfa29kYWxpQHNybWFwLmVkdS5pbiIsIm5hbWUiOiJrb2RhbGkgc3JpIGFrc2hheWEiLCJyb2xsTm8iOiJhcDIzMTEwMDExMTYzIiwiYWNjZXNzQ29kZSI6IlFrYnB4SCIsImNsaWVudElEIjoiOTUyNzEzYTMtOGRhYS00MzdmLTg2YTUtNzk2OTA3MWQ4Zjk5IiwiY2xpZW50U2VjcmV0Ijoia2pzUkpVRllNS013clZ3VyJ9.3F39rKTx0YUAxDlExf6qELG2XssOhJCUHZ2ykriqDuI';
  
  try {
    const res = await fetch(apiUrl, {
      headers: {
        Authorization: token,
      },
    });
    
    const data = await res.text();
    
    return new Response(data, {
      status: res.status,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ error: 'Proxy request failed', details: errorMessage }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

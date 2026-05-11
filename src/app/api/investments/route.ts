import { auth } from "@clerk/nextjs/server";
import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { sessionClaims, userId } = await auth();

    const MASTER_USER_IDS = [
      "user_3BTsg6kSbYZtxfN2v95I3mUEnyj",
      "user_3DZ2kNO4aJttcHWOCvEVLGetvDg",
      "user_3DZ2dDCPdOnudmhX2MyuM8uPAnC",
      "user_3DZ2TDJjPROri8pIXILJByTdONg",
      "user_3DZ274PkqLpOkYZPkEOdI9xumPX",
    ];

    const isMaster = (userId && MASTER_USER_IDS.includes(userId)) || sessionClaims?.metadata?.role === "admin";

    // Secure check: only admin role allowed to modify data
    if (!isMaster) {
      return new NextResponse("Unauthorized: Master Account Required", { status: 403 });
    }

    const body = await req.json();
    const { id, ...data } = body;

    let result;
    if (id) {
      // Update existing record
      result = await supabase
        .from("investments_Alpha_Dine")
        .update(data)
        .eq("id", id);
    } else {
      // Insert new record
      result = await supabase
        .from("investments_Alpha_Dine")
        .insert([data]);
    }

    if (result.error) {
      console.error("Supabase Error:", result.error);
      return new NextResponse(result.error.message, { status: 500 });
    }

    return NextResponse.json({ success: true, data: result.data });
  } catch (error) {
    console.error("API Error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { sessionClaims, userId } = await auth();

    const MASTER_USER_IDS = [
      "user_3BTsg6kSbYZtxfN2v95I3mUEnyj",
      "user_3DZ2kNO4aJttcHWOCvEVLGetvDg",
      "user_3DZ2dDCPdOnudmhX2MyuM8uPAnC",
      "user_3DZ2TDJjPROri8pIXILJByTdONg",
      "user_3DZ274PkqLpOkYZPkEOdI9xumPX",
    ];

    const isMaster = (userId && MASTER_USER_IDS.includes(userId)) || sessionClaims?.metadata?.role === "admin";

    // Secure check: only admin role allowed to delete data
    if (!isMaster) {
      return new NextResponse("Unauthorized: Master Account Required", { status: 403 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return new NextResponse("ID required", { status: 400 });
    }

    const { error } = await supabase
      .from("investments_Alpha_Dine")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Supabase Error:", error);
      return new NextResponse(error.message, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("API Error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

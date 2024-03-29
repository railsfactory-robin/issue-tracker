import { NextRequest, NextResponse } from "next/server";
import { z } from 'zod'
import prisma from "../../../../../../../prisma/client";
import { upsertAttachment } from '@/actions/upload'
import { getUserByEmail } from "@/data/user";

import { createIssueSchema } from '@/schemas'

export async function PATCH(request: NextRequest, { params }: { params: { issueId: string } }) {
  const body = await request.json()
  const validation = createIssueSchema.safeParse(body)
  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 })

  const reporter = await getUserByEmail(body.reporter);
  if (!reporter) {
    return NextResponse.json({ error: "Reporter Invalid" }, { status: 400 })
  }
  const assgnee = await getUserByEmail(body.assignee);
  if (!assgnee) {
    return NextResponse.json({ error: "Assgnee Invalid" }, { status: 400 })
  }

  const updatedIssue = await prisma.issue.update({
    where: { id: Number(params.issueId) },
    data: {
      title: body.title,
      description: body.description,
      reporterId: reporter.id,
      assigneeId: assgnee.id,
      priority: body.priority,
      type: body.type
    }
  })

  if (updatedIssue && body.imageUrls.length > 0) {
    const newAttachment = await upsertAttachment(body.imageUrls, updatedIssue.id)
  }

  return NextResponse.json(updatedIssue, { status: 200 })
}
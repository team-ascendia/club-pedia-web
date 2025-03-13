"use server"

import ky from "ky"

export const sendSlackNotification = async (error: Record<string, unknown>) => {
  ky.post("https://hooks.slack.com/services/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", {
    json: error,
  })
}

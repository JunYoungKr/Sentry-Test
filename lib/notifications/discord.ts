interface ErrorNotification {
  type: "API_ERROR" | "AUTH_ERROR" | "SERVER_ERROR";
  statusCode: number;
  message: string;
  endpoint?: string;
  userId?: string;
  timestamp: string;
  stack?: string;
  additionalInfo?: Record<string, any>;
}

export async function sendDiscordNotification(error: ErrorNotification) {
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;

  if (!webhookUrl) {
    console.warn("Discord webhook URL not configured");
    return;
  }

  // 색상 코드 (Discord embed color)
  const colors = {
    400: 0xffa500, // 주황 (Bad Request)
    401: 0xff4444, // 빨강 (Unauthorized)
    500: 0xff0000, // 진한 빨강 (Server Error)
  };

  const embed = {
    title: `🚨 ${error.type}`,
    description: error.message,
    color: colors[error.statusCode as keyof typeof colors] || 0x808080,
    fields: [
      {
        name: "Status Code",
        value: error.statusCode.toString(),
        inline: true,
      },
      {
        name: "Endpoint",
        value: error.endpoint || "Unknown",
        inline: true,
      },
      {
        name: "Timestamp",
        value: error.timestamp,
        inline: false,
      },
    ],
    footer: {
      text: "Error Monitoring System",
    },
  };

  // 추가 정보가 있으면 필드에 추가
  if (error.userId) {
    embed.fields.push({
      name: "User ID",
      value: error.userId,
      inline: true,
    });
  }

  if (error.additionalInfo) {
    embed.fields.push({
      name: "Additional Info",
      value: `\`\`\`json\n${JSON.stringify(
        error.additionalInfo,
        null,
        2
      )}\n\`\`\``,
      inline: false,
    });
  }

  // 스택 트레이스 (길면 잘라내기)
  if (error.stack) {
    const truncatedStack = error.stack.slice(0, 1000);
    embed.fields.push({
      name: "Stack Trace",
      value: `\`\`\`\n${truncatedStack}\n\`\`\``,
      inline: false,
    });
  }

  try {
    await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: "Error Bot",
        embeds: [embed],
      }),
    });
  } catch (err) {
    console.error("Failed to send Discord notification:", err);
  }
}

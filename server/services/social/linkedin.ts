interface LinkedInPostData {
  title: string;
  description: string;
  companyName: string;
  jobUrl: string;
}

export class LinkedInService {
  private static async makeRequest(url: string, options: RequestInit) {
    const response = await fetch(url, {
      ...options,
      headers: {
        "X-Restli-Protocol-Version": "2.0.0",
        ...options.headers,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`LinkedIn API error: ${response.status} - ${errorText}`);
    }

    return response.json();
  }

  static async getOrganizations(accessToken: string) {
    return this.makeRequest(
      "https://api.linkedin.com/v2/organizationAcls?q=roleAssignee&role=ADMINISTRATOR&state=APPROVED",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
  }

  static async getOrganizationDetails(
    organizationId: string,
    accessToken: string
  ) {
    return this.makeRequest(
      `https://api.linkedin.com/v2/organizations/${organizationId}?projection=(localizedName,logoV2(original~:playableStreams))`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
  }

  static async postToCompanyPage(
    organizationUrn: string,
    accessToken: string,
    postData: LinkedInPostData
  ) {
    const postContent = `🚀 We're hiring: ${postData.title}

${postData.description}

Company: ${postData.companyName}

Ready to join our team? Apply now: ${postData.jobUrl}

#hiring #jobs #career #opportunity`;

    const payload = {
      author: organizationUrn,
      lifecycleState: "PUBLISHED",
      specificContent: {
        "com.linkedin.ugc.ShareContent": {
          shareCommentary: {
            text: postContent,
          },
          shareMediaCategory: "ARTICLE",
          media: [
            {
              status: "READY",
              originalUrl: postData.jobUrl,
            },
          ],
        },
      },
      visibility: {
        "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC",
      },
    };

    return this.makeRequest("https://api.linkedin.com/v2/ugcPosts", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
  }
}

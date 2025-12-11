/**
 * Organization utility functions
 */

export type OrganizationData = {
  id: string;
  name: string;
};

/**
 * Extracts organization ID and name from the dynamic nested organization object
 * Example structure:
 * {
 *   "cambio": {
 *     "id": "14d472ab-c06b-439b-84aa-303d0390182b"
 *   }
 * }
 *
 * @param organization - The organization object with dynamic keys
 * @returns Object with id and name, or null if invalid
 */
export function extractOrganizationData(
  organization: Record<string, { id: string }> | object | null | undefined
): OrganizationData | null {
  if (!organization || typeof organization !== "object") {
    return null;
  }

  // Get the first key (organization name) from the object
  const orgNames = Object.keys(organization);

  if (orgNames.length === 0) {
    return null;
  }

  const orgName = orgNames[0];
  const orgData = (organization as Record<string, { id: string }>)[orgName];

  if (!orgData || !orgData.id) {
    return null;
  }

  return {
    id: orgData.id,
    name: orgName,
  };
}

/**
 * Gets just the organization ID from the dynamic nested structure
 *
 * @param organization - The organization object with dynamic keys
 * @returns Organization ID or null
 */
export function getOrganizationId(
  organization: Record<string, { id: string }> | object | null | undefined
): string | null {
  const orgData = extractOrganizationData(organization);
  return orgData?.id || null;
}

/**
 * Gets just the organization name from the dynamic nested structure
 *
 * @param organization - The organization object with dynamic keys
 * @returns Organization name (the dynamic key) or null
 */
export function getOrganizationName(
  organization: Record<string, { id: string }> | object | null | undefined
): string | null {
  const orgData = extractOrganizationData(organization);
  return orgData?.name || null;
}

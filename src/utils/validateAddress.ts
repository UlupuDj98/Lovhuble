interface AddressParams {
  street: string;
  city: string;
  postalCode: string;
  countryCode?: string;
}

export async function validateAddress({
  street,
  city,
  postalCode,
  countryCode = 'it',
}: AddressParams): Promise<boolean> {
  try {
    const params = new URLSearchParams({
      format: 'json',
      street,
      city,
      postalcode: postalCode,
      countrycode: countryCode.toLowerCase(),
      limit: '1',
    });
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?${params}`,
      { headers: { Accept: 'application/json' } }
    );
    if (!res.ok) return true;
    const data = await res.json();
    return Array.isArray(data) && data.length > 0;
  } catch {
    return true;
  }
}

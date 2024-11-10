export async function fetchData(
  url: string,
  options?: RequestInit
): Promise<any> {
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP error! Estado: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
}

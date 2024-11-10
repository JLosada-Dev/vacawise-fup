export async function fetchData(url: any) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Estado: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
}

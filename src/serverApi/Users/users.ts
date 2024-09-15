export const getUser = async ({ email }: { email: string }) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users:${email}`, {
      method: "GET"
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getUserHandles = async ({ email }: { email: string }) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/handles/${email}`, {
      method: "GET"
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

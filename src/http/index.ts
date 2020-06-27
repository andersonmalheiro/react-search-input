interface params {
  url: string;
  body?: any;
  query?: object;
  options?: RequestInit;
}

export const client = async ({ url, query = {}, body = {} }: params) => {
  const urlObj = new URL(url);

  if (query && Object.keys(query)) {
    urlObj.search = new URLSearchParams(query as URLSearchParams).toString();
  }

  try {
    const response = await fetch(urlObj.href, { method: 'GET' });
    if (response.ok) {
      return response.json();
    } else {
      console.log('Request not ok');
    }
  } catch (error) {
    console.error(error);
  }
};

export const http = ({ url, query = {}, body = {}, options }: params) => {
  const urlObj = new URL(url);

  if (query && Object.keys(query)) {
    urlObj.search = new URLSearchParams(query as URLSearchParams).toString();
  }

  const _get = async () => {
    try {
      const response = await fetch(urlObj.href, { method: 'GET', ...options });
      if (response.ok) {
        return response.json();
      } else {
        console.log('Request not ok');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const _post = async () => {
    try {
      const response = await fetch(urlObj.href, {
        method: 'POST',
        body,
        ...options,
      });
      if (response.ok) {
        return response.json();
      } else {
        console.log('Request not ok');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const _put = async () => {
    try {
      const response = await fetch(urlObj.href, {
        method: 'PUT',
        body,
        ...options,
      });
      if (response.ok) {
        return response.json();
      } else {
        console.log('Request not ok');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const _delete = async () => {
    try {
      const response = await fetch(urlObj.href, {
        method: 'DELETE',
        body,
        ...options,
      });
      if (response.ok) {
        return response.json();
      } else {
        console.log('Request not ok');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return { get: _get, post: _post, put: _put, delete: _delete };
}

export class HttpService {
  constructor() {
    // this.requestHeaders = new Headers({
    //   'Content-Type': 'application/json'
    // });
    this.requestHeaders = null;
  }

  request(method, url, payload = null, headers = this.requestHeaders) {
    const requestOptions = {
      method,
      body: payload, // could use formData object
      headers
    };

    return fetch(url/*, requestOptions*/)
      .then(response => {
        if (response.ok) {
          // console.log('content-type:', response.headers.get('content-type'));
          return response;
        } else {
          throw response.statusText;
        }
      })
      .then(response => response.json()) // .text(), .blob(), .formData(), .arrayBuffer()
                                        // .clone(), .error(), .redirect() => Create another response
      .catch(err => console.log);
  }
}

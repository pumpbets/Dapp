/**
 * Front-end fetch syste,
 */


const coingeckoBaseUrl = `https://api.coingecko.com/api/v3/simple/price`;
const pumpWebApi = `https://pumpbets.fun/api`
const request_router = {

  app_indexer: {
    price : coingeckoBaseUrl
  },
  pump:{
    list : pumpWebApi+"/list",
    search : pumpWebApi+"/find",
    new : pumpWebApi+"/new"
  }

};

async function requester(url: string, requestOptions: any) {
  try {
    return (await fetch(url, requestOptions)).json();
  } catch (e) {
    console.log("🐞 req error", e);
  }

  return false;
}

function request_method_get(headers: any) {
  var requestOptions = {
    method: "GET",
    headers: headers,
    redirect: "follow",
  };

  return requestOptions;
}

function request_method_post(bodys: any, headers: any) {
  var requestOptions = {
    method: "POST",
    headers: headers,
    body: bodys,
    redirect: "follow",
  };

  return requestOptions;
}


function request_get_unauth() {
  return request_method_get({});
}


function request_post_unauth(data: any) {
  var h = new Headers();

  h.append("Content-Type", "application/json");

  return request_method_post(JSON.stringify(data), h);
}




async function api_price_oracle(token:string) {
  try {
    return await requester(
      `${request_router.app_indexer.price}?ids=${token}&vs_currencies=usd`,
      request_get_unauth(),
    );
  } catch (e) {
    console.error(e);

    return 0;
  }
}

async function api_bet_list(page:number,limit:number) {
    try {
    return await requester(
        `${request_router.pump.list}?page=${page}&limit=${limit}`,
        request_get_unauth(),
      );
    } catch (e) {
      console.error(e);
  
      return 0;
    }
  }

  async function api_bet_search(search:string) {
    try {
    return await requester(
        `${request_router.pump.search}?id=${search}`,
        request_get_unauth(),
      );
    } catch (e) {
      console.error(e);
  
      return 0;
    }
  }

  async function api_bet_new(bet:string,sign:string) {
    try {
    return await requester(
        `${request_router.pump.new}`,
        request_post_unauth(
          {
            msg:bet,
            sign:sign
          }
        ),
      );
    } catch (e) {
      console.error(e);
  
      return 0;
    }
  }


export {

    api_price_oracle,
    api_bet_list,
    api_bet_search,
    api_bet_new
};
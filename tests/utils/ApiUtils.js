class ApiUtils {

    constructor(apiContext) {
        this.apiContext = apiContext;
    }

    async getToken() {
        const loginResponse = await this.apiContext.post("https://www.rahulshettyacademy.com/api/ecom/auth/login", {data: loginPayload});

        expect(loginResponse.ok()).toBeTruthy();
        const loginResponseJson = await loginResponse.json();
        // @ts-ignore
        token = loginResponseJson.token;
        return token;
    }

    async createOrder() {
            const orderResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order", {
                data: orderPayload,
                headers: {
                    'Authorization': token,
                    'Content-Type': 'application/json'
                }
                });
            const orderResponseJson = orderResponse.json();
            orderId = orderResponseJson.orders[0];
    }
}
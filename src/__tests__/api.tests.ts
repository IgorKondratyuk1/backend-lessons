// @ts-nocheck
import request from 'supertest';
import {app} from "../index";
import {ProductViewModel} from "../models/post/product-view-model";
import {CreateProductModel} from "../models/post/create-product-model";
import {APIErrorResult} from "../types/types";

describe("products", () => {
    // GET
    it("GET:products should return 3 posts", async () => {
        const result = await request(app)
            .get("/api/products");

        expect(result.status).toBe(200);
        expect(result.body.length).toBe(3);
    });

    it("GET:products should return post with id 1", async () => {
        const result = await request(app)
            .get("/api/products/1");

        expect(result.status).toBe(200);

        const expectedObj: ProductViewModel = {
            id: "1",
            name: "first-product",
            youtubeUrl: "url-1"
        };
        expect(result.body).toEqual(expectedObj);
    });

    // POST
    let firstproduct: any = null;
    it("POST:products should create post", async () => {
        const data: CreateProductModel = {
            name: "New product",
            youtubeUrl: "https://www.youtube.com"
        };

        const result = await request(app)
            .post("/api/products")
            .set("Authorization", "Basic YWRtaW46cXdlcnR5")
            .send(data);

        firstproduct = result.body;

        expect(result.status).toBe(201);
        const expectedObj = {
            id: expect.any(String),
            name: data.name,
            youtubeUrl: data.youtubeUrl
        };
        expect(result.body).toEqual(    expectedObj);
    });

    it("GET:products should return created post", async () => {
        const result = await request(app)
            .get(`/api/products/${firstproduct?.id}`);

        expect(result.status).toBe(200);
        expect(result.body).toEqual(firstproduct);
    });

    let secondproduct: any = null;
    it("POST:products should create post with spaces", async () => {
        const data: CreateProductModel = {
            name: "   Spaces       ",
            youtubeUrl: "https://www.youtube.com"
        };
        const result = await request(app)
            .post("/api/products")
            .set("Authorization", "Basic YWRtaW46cXdlcnR5")
            .send( data);

        secondproduct = result.body;

        expect(result.status).toBe(201);
        const expecedObj: ProductViewModel = {
            id: expect.any(String),
            name: data.name.trim(),
            youtubeUrl: data.youtubeUrl
        };
        expect(result.body).toEqual(expecedObj);
    });

    it("POST:products shouldn`t create post with lenth > 15", async () => {
        const data: CreateProductModel = {
            name: "1234567890123456",
            youtubeUrl: "https://www.youtube.com"
        };

        const result = await request(app)
            .post("/api/products")
            .set("Authorization", "Basic YWRtaW46cXdlcnR5")
            .send(data);

        expect(result.status).toBe(400);
        const expectedError: APIErrorResult = {
            errorsMessages: [
                {
                    "message": expect.any(String),
                    "field": "name"
                }
            ]
        };
        expect(result.body).toEqual(expectedError);
    });


    it("POST:products shouldn`t create post without youtubeUrl", async () => {
        const result = await request(app)
            .post("/api/products")
            .set("Authorization", "Basic YWRtaW46cXdlcnR5")
            .send({
                name: "New post"
            });

        expect(result.status).toBe(400);
        const expectedError: APIErrorResult = {
            errorsMessages: [
                {
                    "message": expect.any(String),
                    "field": "youtubeUrl"
                }
            ]
        };
        expect(result.body).toEqual(expectedError);
    });

    it("POST:products shouldn`t create post with lentgth > 100", async () => {
        const data: CreateProductModel = {
            name: "New post",
            youtubeUrl: "https://www.youtube.comLorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean m1"
        };
        const result = await request(app)
            .post("/api/products")
            .set("Authorization", "Basic YWRtaW46cXdlcnR5")
            .send(data);

        expect(result.status).toBe(400);
        const expectedError: APIErrorResult = {
            errorsMessages: [
                {
                    "message": expect.any(String),
                    "field": "youtubeUrl"
                }
            ]
        };
        expect(result.body).toEqual(expectedError);
    });

    it("POST:products shouldn`t create post with wrong url", async () => {
        const data: CreateProductModel = {
            name: "New post",
            youtubeUrl: "https:\\/www.youtube.com"
        };
        const result = await request(app)
            .post("/api/products")
            .set("Authorization", "Basic YWRtaW46cXdlcnR5")
            .send(data);

        expect(result.status).toBe(400);
        const expectedError = {
            errorsMessages: [
                {
                    "message": expect.any(String),
                    "field": "youtubeUrl"
                }
            ]
        };
        expect(result.body).toEqual(expectedError);
    });

    // PUT
    it("PUT:products should be updated by correct data", async () => {
        const data: CreateProductModel = {
            name: "Changed title",
            youtubeUrl: "https://www.google.com"
        };
        await request(app)
            .put(`/api/products/${firstproduct.id}`)
            .set("Authorization", "Basic YWRtaW46cXdlcnR5")
            .send(data).expect(204);

        const result = await request(app)
            .get(`/api/products/${firstproduct?.id}`);

        expect(result.status).toBe(200);
        const expectedObj = {
            id: expect.any(String),
            name: data.name,
            youtubeUrl: data.youtubeUrl
        };
        expect(result.body).toEqual(expectedObj);
    });

    it("PUT:products shouldn`t be updated by wrong data (without field 'name')", async () => {
        await request(app)
            .put(`/api/products/${secondproduct.id}`)
            .set("Authorization", "Basic YWRtaW46cXdlcnR5")
            .send({
                youtubeUrl: "https://www.google.com"
            }).expect(400);

        const result = await request(app)
            .get(`/api/products/${secondproduct?.id}`);

        expect(result.status).toBe(200);
        expect(result.body).toEqual(secondproduct);
    });

    it("PUT:products shouldn`t be updated by wrong data (without field 'youtubeUrl')", async () => {
        await request(app)
            .put(`/api/products/${secondproduct.id}`)
            .set("Authorization", "Basic YWRtaW46cXdlcnR5")
            .send({
                name: "Changed Title"
            }).expect(400);

        const result = await request(app)
            .get(`/api/products/${secondproduct?.id}`);

        expect(result.status).toBe(200);
        expect(result.body).toEqual(secondproduct);
    });

    it("PUT:products shouldn`t be updated by wrong data (without wrong id)", async () => {
        const data: CreateProductModel = {
            name: "Changed Title",
            youtubeUrl: "https://www.google.com"
        };
        await request(app)
            .put(`/api/products/1234556789`)
            .set("Authorization", "Basic YWRtaW46cXdlcnR5")
            .send(data).expect(404);
    });

    // DELETE
    it("DELETE:products shouldn`t be deleted (without wrong id)", async () => {
        await request(app)
            .delete(`/api/products/1234556789`)
            .set("Authorization", "Basic YWRtaW46cXdlcnR5")
            .expect(404);
    });

    it("DELETE:products should be deleted", async () => {
        await request(app)
            .delete(`/api/products/${firstproduct.id}`)
            .set("Authorization", "Basic YWRtaW46cXdlcnR5")
            .expect(204);

        await request(app)
            .delete(`/api/products/${secondproduct.id}`)
            .set("Authorization", "Basic YWRtaW46cXdlcnR5")
            .expect(204);
    });

    it("GET:products should be again returned 3 posts", async () => {
        const result = await request(app)
            .get("/api/products");

        expect(result.status).toBe(200);
        expect(result.body.length).toBe(3);
        //console.log(result.body);
    });
});
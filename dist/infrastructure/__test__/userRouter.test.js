"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../../server"));
describe("", () => {
    it("should respond to GET /api/test with a success message", async () => {
        const response = await (0, supertest_1.default)(server_1.default).get("/api/test");
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ message: "test successed" });
    });
});
//# sourceMappingURL=userRouter.test.js.map
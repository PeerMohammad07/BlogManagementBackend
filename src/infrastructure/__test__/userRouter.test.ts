import request from 'supertest';
import express from 'express';
import app from '../../server';


describe("",()=>{
  it("should respond to GET /api/test with a success message",async ()=>{
    const response = await request(app).get("/api/test");
    expect(response.status).toBe(200)
    expect(response.body).toEqual({message:"test successed"})
  })
})
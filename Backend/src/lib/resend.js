import "dotenv/config"
import {Resend} from "resend";
import {ENV} from "./env.js"

export const resendClient = new Resend(ENV.RESEND_API_KEY);

export const sender = {
    email:ENV.RESEND_EMAIL,
    name: ENV.RESEND_NAME
}
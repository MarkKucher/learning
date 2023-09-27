import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface message {
    email: string[];
    subject: string;
    content: string[];
}

let mes: message | undefined = undefined;

export default async function handler(req: any, res: any) {
    const {email, subject, text} = JSON.parse(req.body.body);

    if(!subject || !email) {
        res.status(400).json({invalid: true});
    }

    await resend.emails.send({
        from: "onboarding@resend.dev",
        to: [email],
        subject,
        text
    })

    res.status(200).json({invalid: false});
}
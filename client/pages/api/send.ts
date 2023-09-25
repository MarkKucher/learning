import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface message {
    email: string[];
    subject: string;
    content: string[];
}

let mes: message | undefined = undefined;

const timer = (time: number) => {
    return new Promise((res) => {
        setTimeout(() => res(true), time)
    })
}

setInterval(() => {
    if(!mes) return;
    const {email, subject, content} = mes;

    const text = content.pop();

    if(!text) {
        mes = undefined;
        return;
    }

    resend.emails.send({
        from: "onboarding@resend.dev",
        to: email,
        subject,
        text
    })
}, 300000)

export default async function handler(req: any, res: any) {
    const {subject, email, tasks, text} = JSON.parse(req.body.body);
    if(!subject || !email) {
        res.status(400).json({invalid: true});
    }

    if(!tasks) {
        if(!text) return;
        await resend.emails.send({
            from: "onboarding@resend.dev",
            to: [email],
            subject,
            text: text
        })
    } else {
        mes = {email, subject, content: tasks}
    }

    res.status(200).json({invalid: false});
}
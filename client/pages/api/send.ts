import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const timer = (time: number) => {
    return new Promise((res) => {
        setTimeout(() => res(true), time)
    })
}

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
        for (let i = 0; i < tasks.length; i++) {
            await resend.emails.send({
                from: "onboarding@resend.dev",
                to: [email],
                subject,
                text: tasks[i]
            })
            await timer(300000)
        }
    }

    res.status(200).json({invalid: false});
}
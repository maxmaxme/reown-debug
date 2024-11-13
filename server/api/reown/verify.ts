import {SiweMessage} from 'siwe';

export default defineEventHandler(async (event) => {
    const body = await readBody(event) as { message: string, signature: string, nonce: string };

    try {
        if (!body) {
            return new Response(JSON.stringify({error: 'SiweMessage is undefined'}), {status: 400});
        }
        console.log('body', body)
        console.log('body.message', body.message)
        let SIWEObject = new SiweMessage(body.message);
        await SIWEObject.verify({signature: body.signature, nonce: body.nonce});

        return true;
    } catch (e: any) {
        console.log(e);
        return new Response(JSON.stringify({message: e.message}), {status: 500});
    }
})
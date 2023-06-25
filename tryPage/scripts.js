import { Configuration, OpenAIApi } from 'openai';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { backOff } from 'exponential-backoff';

const configuration = new Configuration({
    organization: 'org-mtnx3paq9vdUscGbK1znT4p4',
    apiKey: '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',
});

const openai = new OpenAIApi(configuration);

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());
try {
    app.post('/', async (req, res) => {
        const { message } = req.body;

        //Messages can be collected here in an array to create a history if needed.

        const completion = await backOff(() =>
            openai.createChatCompletion({
                model: 'gpt-3.5-turbo',
                messages: [
                    {
                        role: 'user',
                        content: `This portion of the text are instructions for you. Do not refer to them in your response. Please respond using simple but correct language. If I ask you a question, answer it in simple language. If I give you text, simplify it. If I ask you to explain something, respond in simple language. This is the end of the instructions for you.  ${message}`,
                    },
                ],
            })
        );
        res.json({
            completion: completion.data.choices[0].message,
        });
    });
} catch (e) {
    console.log(e);
}

app.listen(port, () =>
    console.log(`example app listening at port https://localhost:${port}`)
);

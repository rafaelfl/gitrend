import { rest } from 'msw';
import { dataMock, generateRandomDataMocks } from './dataMock';

export const handlers = [
    rest.get('https://api.github.com/search/repositories', (req, res, ctx) => {
        const queryString: string = decodeURIComponent(req.url.searchParams.get('q') as string);
        const pageNumber: number = parseInt(req.url.searchParams.get('page') as string);

        if (pageNumber > 2) {
            return res(
                ctx.status(422),
                ctx.json({
                    message: 'Only the first 1000 search results are available',
                    documentation_url: 'https://docs.github.com/v3/search/',
                }),
                ctx.delay(150),
            );
        }

        if (queryString.includes('language:cpp')) {
            const filteredData = { ...dataMock };

            filteredData.items = filteredData.items.filter((item: any) => item.language === 'C++');

            return res(ctx.status(200), ctx.json(filteredData), ctx.delay(150));
        }

        if (queryString.includes('language:csharp')) {
            const filteredData = { ...dataMock };

            filteredData.items = filteredData.items.filter((item: any) => item.language === 'C#');

            return res(ctx.status(200), ctx.json(filteredData), ctx.delay(150));
        }

        if (queryString.includes('language:assembly')) {
            return res(
                ctx.status(200),
                ctx.json({
                    total_count: 0,
                    incomplete_results: false,
                    items: [],
                }),
                ctx.delay(150),
            );
        }

        if (queryString.includes('language:typescript')) {
            return res(ctx.status(422), ctx.json({}), ctx.delay(150));
        }

        if (queryString.includes('language:dart')) {
            return res(ctx.status(200), ctx.json({}), ctx.delay(150));
        }

        if (queryString.includes('language:javascript')) {
            const randomDataMocks = generateRandomDataMocks(30);

            return res(
                ctx.status(200),
                ctx.json({
                    total_count: 1001, //randomDataMocks.length,
                    incomplete_results: true,
                    items: randomDataMocks,
                }),
                ctx.delay(150),
            );
        }

        return res(ctx.status(200), ctx.json(dataMock), ctx.delay(150));
    }),
];

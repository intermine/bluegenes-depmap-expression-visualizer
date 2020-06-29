const depMapExpressionQuery = geneId => ({
	from: 'Gene',
	select: [
		'Gene.depMapExpression.cellLine.DepMapID',
		'Gene.depMapExpression.cellLine.Lineage',
		'Gene.depMapExpression.cellLine.Disease',
		'Gene.depMapExpression.DepmapExpressionValue'
	],
	orderBy: [
		{
			path: 'Gene.depMapExpression.cellLine.Disease',
			direction: 'ASC'
		}
	],
	where: [
		{
			path: 'Gene.id',
			op: '=',
			value: geneId
		}
	]
});

import imjs from 'imjs';

function queryData(geneId, serviceUrl, imjsClient = imjs) {
	return new Promise((resolve, reject) => {
		const service = new imjsClient.Service({ root: serviceUrl });
		service
			.records(depMapExpressionQuery(geneId))
			.then(data => {
				if (data.length) resolve(data[0]);
				else reject('No data found!');
			})
			.catch(() => reject('No data found!'));
	});
}

export default queryData;
let Keen;
if (window && window.Keen) {
    Keen = window.Keen;
} else {
	Keen = function() {};
	Keen.prototype.addEvent  = function() {};
	Keen.prototype.addEvents = function() {};
}

const client = new Keen({
	projectId : '555a93d090e4bd76add99312',
	writeKey  : '1fde1df05e5fafc4286f80460d89dc24a17a9034b362607fc6830db4af83fb59a2d88062dd8d79447bcc2614493cbdb91e54481e2a5f9e4c4d03de28b1c48224bdd20db8b28fa5260f4c7b4ffccfa4af604edd9c27ecbfda8d351e503b36a21b7aeb200cab0764d2f01715cf0ff64466'
});

export default client;

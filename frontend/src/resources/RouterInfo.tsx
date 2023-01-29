import PageMain from '../page/PageMain';
import PageDashBoard from '../page/PageDashBoard';
import PageTree from '../page/PageTree';
import PageRecent from '../page/PageRecent';

const RouterInfo = [
	{
		path: '/',
		element: <PageMain />,
	},
	{
		path: '/dashboard',
		element: <PageDashBoard />,
	},
	{
		path: '/tree',
		element: <PageTree />,
	},
	{
		path: '/recent',
		element: <PageRecent />,
	},
];

export default RouterInfo;

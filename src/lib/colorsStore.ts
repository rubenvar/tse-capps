// ! not used, just for reference or just in case
import { goto } from '$app/navigation';
import { page } from '$app/stores';

export function createQueryStore(prop: string) {
	console.log(prop);
	
	let query: { [k: string]: string };

	page.subscribe((v) => {
		query = Object.fromEntries(v.url.searchParams);
	});

	return {
		subscribe: (cb: (prop: string | null) => void) => {
			// any time $page gets updated, we'll update the queryStore
			return page.subscribe((p) => {
        // cb(p.url.searchParams.get(prop));
				query = Object.fromEntries(p.url.searchParams);
				cb(query[prop]);
			});
		},
		set: (value: string) => {
			// any time the queryStore gets updated, we'll also update the url using goto()
			query[prop] = value;
			console.log(query);
			const urlSearchParams = new URLSearchParams(query);
			goto(`?${urlSearchParams.toString()}`, {
				keepFocus: true,
				replaceState: true,
				noScroll: true
			});
		}
	};
}

// const URLSearchParamsToObject = (params: URLSearchParams) => {
//   let obj = {};
//   params.forEach((v: string, k: string) => {
//     obj[k] = v;
//   });
//   return obj;
// };

// export const createQueryParamsStore = (key: string) => {
//   let params;
//   page.subscribe((v) => {
//     params = URLSearchParamsToObject(v.query);
//   });

//   return {
//     subscribe: (cb: Function) => {
//       return page.subscribe((p) => {
//         cb(p.query.get(key));
//       });
//     },
//     set: (value: string) => {
//       params[key] = value;
//       const urlSearchParams = new URLSearchParams(params);
//       goto(`?${urlSearchParams.toString()}`, {
//         keepfocus: true,
//         replaceState: true,
//         noscroll: true
//       });
//     }
//   };
// };

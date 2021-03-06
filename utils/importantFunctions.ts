import fetch from "node-fetch"
import { RawDay } from "./interfaces"
import { getMealStrings } from "./dataCrunching"

export async function getTodaysMealCode() {
	const meatballsAndMashRegex = /meatballs.*mashed|mashed.*meatballs/
	const today = await getFood(getCurrentDate())
	const filterRegex = initFilterRegex(today)

  if (today.length === 1) today.push('closed')
  
  return filterRegex(meatballsAndMashRegex)
    ? { msg: "Yep.", code: 1, meat: today[0], veg: today[1] }
    : { msg: "Nope.", code: 0, meat: today[0], veg: today[1] };
}

export async function getFood(start: Date, end: Date = start) {
	const rayDays: RawDay[] = await (await fetch(
		`http://carbonateapiprod.azurewebsites.net/api/v1/mealprovidingunits/3d519481-1667-4cad-d2a3-08d558129279/dishoccurrences?startDate=${start
			.toISOString()
			.substr(0, 10)}&endDate=${end.toISOString().substr(0, 10)}`,
	)).json()
	const mealStrings = getMealStrings(rayDays).map(meal => meal.toLowerCase())
	return mealStrings
}

// functional bby. https://www.w3schools.com/js/js_function_closures.asp
export function initFilterRegex(arr: string[]) {
	// returns null if no match in the array and the array otherwise
	function filterRegex(regex: RegExp) {
		return arr.filter(mealString => regex.test(mealString)).length ? arr : null
	}
	return filterRegex
}

export function getCurrentDate() {
	return new Date(new Date().setTime(+new Date() + 7200000))
}

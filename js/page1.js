const fetchData = async () => {
	try {
		const resp = await fetch("/people.json")
		const data = await resp.json()
		return data
	} catch (Err) {}
}
const getData = (val = 2000) => {
	document.querySelector(".slider-content").innerHTML = `&nbsp$${val}`
	document.querySelector(".people-list").remove()
	fetchData().then((data) => {
		var filterData = data.filter((person) => {
			return parseFloat(person.balance.substr(1).replace(/\,/, "")) < val
		})
		if (filterData.length > 0) {
			if (document.querySelector(".people-list") === null) {
				document
					.querySelector(".output")
					.insertAdjacentHTML("afterbegin", `<div class="people-list"></div>`)
			}
		} else {
			document
				.querySelector(".output")
				.insertAdjacentHTML(
					"afterbegin",
					`<div class='people-list'>No results found</div>`
				)
			return
		}
		filterData.map((person) => {
			document.querySelector(".people-list").insertAdjacentHTML(
				"beforeend",
				`<div class="each-person">
                    <div class="name">${person.name}</div>
                    <div class="balance">${person.balance}</div>
                </div>`
			)
		})
	})
}
window.onload = getData()

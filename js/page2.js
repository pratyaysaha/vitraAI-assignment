const fetchData = async () => {
	try {
		const resp = await fetch("/people.json")
		const data = await resp.json()
		return data
	} catch (Err) {}
}
const getData = () => {
	document.querySelector(".people-list").remove()
	fetchData().then((data) => {
		var filterData = data.filter((person) => {
			return (
				!person.isActive &&
				parseFloat(person.balance.substr(1).replace(/\,/, "")) < 2000
			)
		})
		console.log(filterData)
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
		var personCount = 0
		filterData.map((person) => {
			document.querySelector(".people-list").insertAdjacentHTML(
				"beforeend",
				`<div class="person p${personCount}">
                    <div class="details-wrapper">
                        <div class="name">
                            <span class="title">Name : </span>
                            <span class="content">${person.name}</span>
                        </div>
                        <div class="balance">
                            <span class="title">Balance : </span>
                            <span class="content">${person.balance}</span>
                        </div>
                    </div>
                    <div class="title">Friends :</div>
                    <div class="friends f${personCount}">
                    </div>
                </div>`
			)
			person.friends.map((friend, index) => {
				document.querySelector(`.friends.f${personCount}`).insertAdjacentHTML(
					"beforeend",
					`<div class="friend">
                                ${index + 1}. ${friend.name}
                        </div>`
				)
			})
			personCount += 1
		})
	})
}
window.onload = getData()

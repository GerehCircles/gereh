import axios from "axios"

const titles = document.querySelector("#course > .main_section > .nav")
const tabs = document.querySelector("#course > .main_section > .tab-content")

const courses: string[] = require("../../static/courses.json")
let counter = 1

for (let i = 0; i < courses.length; i++)
{
    titles.innerHTML = titles.innerHTML += `<div class="title"><p class="mb-0">${courses[i][0]}</p></div>`

    for (let j = 1; j <= courses[i][1].length; j++)
    {
        const item = courses[i][1][j - 1]

        titles.innerHTML = titles
            .innerHTML +=
            counter === 1 ?
                `<button class="nav-link active" id="v-pills-cs${counter}-tab" data-bs-toggle="pill" data-bs-target="#v-pills-cs${counter}" type="button" role="tab" aria-controls="v-pills-cs${counter}" aria-selected="true">${item}</button>`
                :
                `<button class="nav-link" id="v-pills-cs${counter}-tab" data-bs-toggle="pill" data-bs-target="#v-pills-cs${counter}" type="button" role="tab" aria-controls="v-pills-cs${counter}" aria-selected="false">${item}</button>`
        counter++
    }
}

for (let i = 1; i <= 28; i++)
{
    axios
        .get(`./docs/cs${i}.md`)
        .then(value =>
        {
            const allText = value.data
            const md = require('markdown-it')()
            const result = md.render(allText)

            tabs.innerHTML = tabs
                .innerHTML +=
                i === 1 ?
                    `<div class="tab-pane fade show active" id="v-pills-cs${i}" role="tabpanel" aria-labelledby="v-pills-cs${i}-tab">${result}</div>`
                    :
                    `<div class="tab-pane fade" id="v-pills-cs${i}" role="tabpanel" aria-labelledby="v-pills-cs${i}-tab">${result}</div>`

            axios
                .get('./courses/' + i + '.jpg', {
                    responseType: 'blob',
                })
                .then(value1 =>
                {
                    const reader = new FileReader()

                    reader.addEventListener("load", function ()
                    {
                        tabs.querySelector(`#v-pills-cs${i}`).innerHTML =
                            `
                            <div class="tum d-flex justify-content-center align-items-center">
                                <img src="${reader.result as string}" alt="${i}">
                            </div>
                            ` + tabs.querySelector(`#v-pills-cs${i}`).innerHTML
                    }, false)

                    reader.readAsDataURL(value1.data)

                })
        })
}

const tables = document.querySelectorAll("table")

tables.forEach(function(item)
{
    item.classList.add("responsive-table")
})

const openMenu: HTMLButtonElement = document.querySelector("#course > .main_section > .mobile > div:last-child > img")

openMenu.addEventListener("click", () =>
{
    titles.classList.toggle("show")
})

const closeMenu: HTMLDivElement = document.querySelector("#course > .main_section .nav > .close")

closeMenu.addEventListener("click", () =>
{
    titles.classList.toggle("show")
})
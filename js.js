 function saveData() {
            const rows = document.querySelectorAll("#tableBody tr");
            const data = [];
            rows.forEach(row => {
                const code = row.querySelector("input").value;
                const count = parseInt(row.querySelector(".counter").textContent);
                data.push({ code, count });
            });
            localStorage.setItem("cargoCounterData", JSON.stringify(data));
        }

        function loadData() {
            const tableBody = document.getElementById("tableBody");
            const saved = localStorage.getItem("cargoCounterData");
            const data = [
                { code: "SR-659", count: 0 },
                { code: "CN-222", count: 0 },
                { code: "DA-1435", count: 0 }
            ];
            data.forEach(item => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td><input type="text" value="${item.code}" oninput="saveData()"></td>
                    <td class="counter">${item.count}</td>
                    <td>
        <button  class="plus" onclick="changeCount(this, 1)">+</button>
        <button class="plus" onclick="changeCount(this, -1)">−</button>
    </td>
    <td>
        <button onclick="deleteRow(this)" style="color:red;">Удалить</button>
    </td>
                `;
                tableBody.appendChild(row);
            });
        }

        function changeCount(button, delta) {
            const counterCell = button.parentElement.parentElement.querySelector('.counter');
            let count = parseInt(counterCell.textContent);
            count = Math.max(0, count + delta);
            counterCell.textContent = count;
            saveData();
        }

        function addRow() {
            const tableBody = document.getElementById("tableBody");
            const newRow = document.createElement("tr");
            newRow.innerHTML = `
                <td><input type="text" value="" oninput="saveData()"></td>
                <td class="counter">0</td>
                <td>
                    <button onclick="changeCount(this, 1)">+</button>
                    <button onclick="changeCount(this, -1)">−</button>
                </td>
                <td>
        <button onclick="deleteRow(this)" style="color:red;">Удалить</button>
    </td>
            `;
            tableBody.appendChild(newRow);
            saveData();
        }


        function resetData() {
            if (confirm("Ты точно хочешь удалить все данные?")) {
                localStorage.removeItem("cargoCounterData");
                location.reload();
            }
        }

        function deleteRow(button) {
            if (confirm("Ты точно хочешь удалить эту строку")) {
                const row = button.parentElement.parentElement;
                row.remove();
                saveData();
            }

        }
        window.onload = loadData;


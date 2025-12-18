$(document).ready(function() {
    let alumniData = [];

    $("#tampilData").click(function() {
        $("#formContainer").slideUp(400);
        $("#tabelContainer").slideDown(400);
        loadData();
    });

    $("#tambahAlumni").click(function() {
        $("#tabelContainer").slideUp(400);
        $("#formContainer").slideDown(400);
        $("#formAlumni")[0].reset();
    });

    $("#batalTambah").click(function() {
        $("#formContainer").slideUp(400);
    });

    $("#formAlumni").submit(function(e) {
        e.preventDefault();
        
        const newAlumni = {
            id: Date.now(),
            nim: $("#nim").val(),
            nama: $("#nama").val(),
            angkatan: $("#angkatan").val(),
            email: $("#email").val(),
            pekerjaan: $("#pekerjaan").val(),
            alamat: $("#alamat").val()
        };

        setTimeout(() => {
            alumniData.push(newAlumni);
            showMessage("Data alumni berhasil disimpan!", "success");
            $("#formContainer").slideUp(400);
        }, 1000);
    });

    function loadData() {
        $("#tbodyAlumni").html('<tr><td colspan="7" class="loading">Memuat data...</td></tr>');
        
        setTimeout(() => {
            if (alumniData.length === 0) {
                alumniData = [
                    {id: 1, nim: '20201001', nama: 'Budi Santoso', angkatan: '2020', email: 'budi@email.com', pekerjaan: 'Software Developer', alamat: 'Jakarta'},
                    {id: 2, nim: '20201002', nama: 'Sari Dewi', angkatan: '2020', email: 'sari@email.com', pekerjaan: 'UI/UX Designer', alamat: 'Bandung'},
                    {id: 3, nim: '20211001', nama: 'Ahmad Fauzi', angkatan: '2021', email: 'ahmad@email.com', pekerjaan: 'Data Analyst', alamat: 'Surabaya'}
                ];
            }
            
            renderTable(alumniData);
        }, 1500);
    }

    function renderTable(data) {
        let html = '';
        data.forEach(alumni => {
            html += `
                <tr>
                    <td>${alumni.nim}</td>
                    <td>${alumni.nama}</td>
                    <td>${alumni.angkatan}</td>
                    <td>${alumni.email}</td>
                    <td>${alumni.pekerjaan}</td>
                    <td>${alumni.alamat}</td>
                    <td>
                        <button class="action-btn edit-btn" onclick="editAlumni(${alumni.id})">✏️ Edit</button>
                        <button class="action-btn delete-btn" onclick="deleteAlumni(${alumni.id})">🗑️ Hapus</button>
                    </td>
                </tr>
            `;
        });
        $("#tbodyAlumni").html(html);
    }

    $("#searchInput").on('keyup', function() {
        const query = $(this).val().toLowerCase();
        const filtered = alumniData.filter(alumni => 
            alumni.nama.toLowerCase().includes(query) || 
            alumni.nim.includes(query)
        );
        renderTable(filtered);
    });

    function showMessage(text, type) {
        const msg = $(`<div class="${type}">${text}</div>`);
        $(".container").prepend(msg);
        msg.hide().fadeIn(500);
        setTimeout(() => msg.fadeOut(1000, () => msg.remove()), 3000);
    }
});

function editAlumni(id) {
    alert(`Fitur Edit untuk ID: ${id} - Bisa dikembangkan dengan modal form!`);
}

function deleteAlumni(id) {
    if (confirm('Yakin hapus data ini?')) {
        alert(`Data dengan ID: ${id} dihapus!`);
    }
}

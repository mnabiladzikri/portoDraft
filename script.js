// 1. Mobile Navigation Drawer Controller
        // const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        // const mobileMenu = document.getElementById('mobile-menu');
        // const menuIcon = document.getElementById('menu-icon');

        // mobileMenuBtn.addEventListener('click', () => {
        //     mobileMenu.classList.toggle('hidden');
        //     if (mobileMenu.classList.contains('hidden')) {
        //         menuIcon.className = 'fa-solid fa-bars text-2xl';
        //     } else {
        //         menuIcon.className = 'fa-solid fa-xmark text-2xl';
        //     }
        // });

        // // Close Mobile Menu when clicking menu link
        // document.querySelectorAll('#mobile-menu a').forEach(link => {
        //     link.addEventListener('click', () => {
        //         mobileMenu.classList.add('hidden');
        //         menuIcon.className = 'fa-solid fa-bars text-2xl';
        //     });
        // });

        // 2. Filter Portfolio Category Logic
        function filterProjects(category) {
            const cards = document.querySelectorAll('.project-card');
            const buttons = document.querySelectorAll('.filter-btn');

            buttons.forEach(btn => {
                btn.classList.remove('bg-brand-orange', 'text-white', 'shadow-sm');
                btn.classList.add('bg-brand-sectionBg', 'border', 'border-brand-border', 'text-brand-muted');
            });

            event.target.classList.remove('bg-brand-sectionBg', 'border', 'border-brand-border', 'text-brand-muted');
            event.target.classList.add('bg-brand-orange', 'text-white', 'shadow-sm');

            cards.forEach(card => {
                if (category === 'all' || card.getAttribute('data-category') === category) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 250);
                }
            });
        }

        // 3. Open Video Modal Viewer
        function openVideoModal(videoUrl, title, description) {
            const modal = document.getElementById('video-modal');
            const iframe = document.getElementById('modal-iframe');
            const titleEl = document.getElementById('modal-title');
            const descEl = document.getElementById('modal-description');

            iframe.src = videoUrl + "?autoplay=1";
            titleEl.innerText = title;
            descEl.innerText = description;

            modal.classList.remove('hidden');
            modal.classList.add('flex');
            document.body.style.overflow = 'hidden';
        }

        // Close Video Modal Viewer
        function closeVideoModal() {
            const modal = document.getElementById('video-modal');
            const iframe = document.getElementById('modal-iframe');

            iframe.src = "";
            modal.classList.add('hidden');
            modal.classList.remove('flex');
            document.body.style.overflow = 'auto';
        }

        // Close Modal when clicking dark background backdrop
        document.getElementById('video-modal').addEventListener('click', (e) => {
            if (e.target.id === 'video-modal') {
                closeVideoModal();
            }
        });

        // 4. Download CV Action Simulation
        function downloadCV() {
            showToast('Mengunduh CV...', 'Berkas CV_Aditya_Pratama_Videographer.pdf berhasil diproses!');
        }

        // 5. HR Form Submission Handler (Automatic Direct Email Sending)
        async function handleFormSubmit(event) {
            event.preventDefault();

            const submitBtn = document.getElementById('submit-btn');
            const originalBtnText = submitBtn.innerHTML;

            // Ambil data dari form
            const name = document.getElementById('input-name').value;
            const company = document.getElementById('input-company').value;
            const email = document.getElementById('input-email').value;
            const position = document.getElementById('input-position').value;
            const message = document.getElementById('input-message').value;

            // Alamat email Anda yang menerima seluruh pesan dari website
            const myTargetEmail = "mnabil.creative@gmail.com";

            // Tampilkan status loading pada tombol
            submitBtn.disabled = true;
            submitBtn.innerHTML = `<i class="fa-solid fa-spinner animate-spin text-sm"></i> Mengirim Pesan...`;

            try {
                const response = await fetch(`https://formsubmit.co/ajax/${myTargetEmail}`, {
                    method: "POST",
                    headers: { 
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    },
                    body: JSON.stringify({
                        "Nama Pengirim": name,
                        "Perusahaan / Brand": company,
                        "Email Pengirim (HR/Client)": email,
                        "Posisi Ditawarkan": position,
                        "Pesan / Detail Undangan": message,
                        "_replyto": email, // Agar saat Anda klik Balas/Reply di Gmail langsung ke email client
                        "_subject": `[Portofolio HR] Undangan / Pesan Baru dari ${name} (${company})`,
                        "_template": "table"
                    })
                });

                if (response.ok) {
                    showToast('Pesan Terkirim!', 'Terima kasih, pesan Anda telah otomatis dikirim ke email Aditya.');
                    event.target.reset();
                } else {
                    showToast('Gagal Mengirim', 'Terjadi kesalahan sistem. Silakan coba lagi nanti.');
                }
            } catch (error) {
                showToast('Gagal Mengirim', 'Periksa koneksi internet Anda dan coba lagi.');
            } finally {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;
            }
        }

        // 6. Toast Notification Popup System
        function showToast(title, message) {
            const toast = document.getElementById('toast');
            document.getElementById('toast-title').innerText = title;
            document.getElementById('toast-message').innerText = message;

            toast.classList.remove('hidden');
            toast.classList.add('flex');

            setTimeout(() => {
                toast.classList.add('hidden');
                toast.classList.remove('flex');
            }, 4500);
        }
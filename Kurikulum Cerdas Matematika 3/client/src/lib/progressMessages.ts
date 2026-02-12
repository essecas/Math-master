interface ProgressData {
  total_soal: number;
  benar: number;
  akurasi: number;
}

interface WelcomeMessage {
  pesan: string;
}

export function generateProgressMessage(
  data: ProgressData
): WelcomeMessage {
  const { total_soal, benar, akurasi } = data;

  // Determine message based on accuracy and total questions
  let pesan = "";

  if (total_soal < 10) {
    // Encouragement for getting started
    if (akurasi >= 80) {
      pesan =
        "Wah, kamu sudah mulai kuat! 💪 Ayo lanjutkan latihan untuk hasil yang lebih bagus lagi.";
    } else if (akurasi >= 60) {
      pesan =
        "Bagus, kamu sudah belajar beberapa soal. 📚 Terus semangat ya untuk mencapai hasil lebih baik!";
    } else {
      pesan =
        "Halo! Kamu sudah memulai. 👋 Terus coba dan jangan menyerah, pasti bisa!";
    }
  } else {
    // Messages for 10+ questions completed
    if (akurasi >= 80) {
      pesan = `Luar biasa! 🌟 Kamu sudah menjawab ${total_soal} soal dengan nilai ${akurasi}%. Naik level yuk untuk tantangan baru!`;
    } else if (akurasi >= 60) {
      pesan = `Bagus! 👏 Kamu sudah menyelesaikan ${total_soal} soal dengan nilai ${akurasi}%. Ayo lanjutkan dan tingkatkan nilaimu!`;
    } else {
      pesan = `Semangat! 💪 Kamu sudah coba ${total_soal} soal. Ayo ulangi dan pastikan kamu paham setiap langkahnya.`;
    }
  }

  return { pesan };
}

// Export type for use in other files
export type { ProgressData, WelcomeMessage };

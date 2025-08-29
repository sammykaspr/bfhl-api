import express from "express";

const app = express();
app.use(express.json());

app.post("/bfhl", (req, res) => {
  try {
    const data = req.body.data || [];

    const full_name = "saransh_khera";   // change to your lowercase name
    const dob = "31082004";              // change to ddmmyyyy
    const email = "saransh.khera@vitstudent.ac.in";
    const roll_number = "22BCE0864";

    let odd_numbers = [];
    let even_numbers = [];
    let alphabets = [];
    let special_characters = [];
    let total_sum = 0;
    let concat_letters = "";

    data.forEach((item) => {
      if (/^\d+$/.test(item)) {
        const num = parseInt(item);
        total_sum += num;
        if (num % 2 === 0) {
          even_numbers.push(item);
        } else {
          odd_numbers.push(item);
        }
      } else if (/^[a-zA-Z]+$/.test(item)) {
        alphabets.push(item.toUpperCase());
        concat_letters += item;
      } else {
        special_characters.push(item);
      }
    });

    // alternating caps in reverse
    concat_letters = concat_letters.split("").reverse().join("");
    const alt_caps = concat_letters
      .split("")
      .map((c, i) => (i % 2 === 0 ? c.toUpperCase() : c.toLowerCase()))
      .join("");

    res.status(200).json({
      is_success: true,
      user_id: `${full_name}_${dob}`,
      email,
      roll_number,
      odd_numbers,
      even_numbers,
      alphabets,
      special_characters,
      sum: total_sum.toString(),
      concat_string: alt_caps,
    });
  } catch (err) {
    res.status(400).json({ is_success: false, error: err.message });
  }
});

app.listen(3000, () => console.log("Server running on port 3000"));

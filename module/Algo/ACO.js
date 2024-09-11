// // Canvas setup
// const canvas = document.getElementById("canvas");
// const ctx = canvas.getContext("2d");
// const cities = [];

// // Event listener to add cities
// canvas.addEventListener("click", function (event) {
//   const rect = canvas.getBoundingClientRect();
//   const x = event.clientX - rect.left;
//   const y = event.clientY - rect.top;

//   // Add city coordinates
//   cities.push([x, y]);

//   // Draw city on canvas
//   drawCity(x, y);
// });

// function drawCity(x, y) {
//   ctx.beginPath();
//   ctx.arc(x, y, 5, 0, 2 * Math.PI);
//   ctx.fillStyle = "blue";
//   ctx.fill();
//   ctx.stroke();
// }

// async function handleClick() {
//   if (cities.length < 2) {
//     alert("Please add at least two cities!");
//     return;
//   }
 
//   // Convert the cities array into a distance matrix


//   // Show result
//   document.getElementById(
//     "result"
//   ).textContent = `Best path: ${best_path}, Best length: ${best_length}`;

//   // Animate the ants' movement from the beginning
//   await animateAntJourney(all_paths, n_ants);

//   // Draw the best path
//   drawBestPath(best_path);
// }

  // Helper function for probabilistic selection
  function np_choice(arr, size, p) {
	let sum = 0;
	const rand = Math.random();
	for (let i = 0; i < arr.length; i++) {
	  sum += p[i];
	  if (rand < sum) return [arr[i]];
	}
	return null;
  }


// // Draw the edges of the best path
// function drawBestPath(path) {
//   ctx.beginPath();
//   ctx.strokeStyle = "red";
//   ctx.lineWidth = 2;

//   for (let i = 0; i < path.length; i++) {
//     const [x1, y1] = cities[path[i]];
//     const [x2, y2] = cities[path[(i + 1) % path.length]]; // Connect last city to the first
//     ctx.moveTo(x1, y1);
//     ctx.lineTo(x2, y2);
//   }

//   ctx.stroke();
// }

// // Animate the ant's movement
// function animateAntJourney(paths, numAnts) {
//   return new Promise((resolve, reject) => {
//     let antIndex = 0; // Keep track of which ant is moving
//     let step = 0; // Step of the current path the ant is taking
//     const delay = 500; // Time delay between steps for each ant

//     // Set up the interval to animate each ant
//     const interval = setInterval(() => {
//       // Clear the canvas before drawing
//       ctx.clearRect(0, 0, canvas.width, canvas.height);

//       // Draw the cities again
//       cities.forEach(([x, y]) => drawCity(x, y));

//       // For the current ant, draw the entire path up to the current step
//       const currentPath = paths[antIndex];
//       for (let i = 0; i < step; i++) {
//         const [x1, y1] = cities[currentPath[i]];
//         const [x2, y2] = cities[currentPath[i + 1]];
//         ctx.beginPath();
//         ctx.strokeStyle = "green";
//         ctx.lineWidth = 2;
//         ctx.moveTo(x1, y1);
//         ctx.lineTo(x2, y2);
//         ctx.stroke();
//       }

//       // Draw the current position of the ant in red
//       const [antX, antY] = cities[currentPath[step]];
//       ctx.beginPath();
//       ctx.arc(antX, antY, 5, 0, 2 * Math.PI);
//       ctx.fillStyle = "red";
//       ctx.fill();
//       ctx.stroke();

//       // Move to the next step
//       step++;

//       // If the ant has completed its journey (visited all cities), move to the next ant
//       if (step >= currentPath.length - 1) {
//         antIndex++;
//         step = 0; // Reset step for the new ant

//         // If all ants have completed their journeys, stop the animation
//         if (antIndex >= numAnts) {
//           clearInterval(interval);
//           resolve();
//         }
//       }
//     }, delay);
//   });
// }

// Ant Colony Optimization (ACO) Implementation
export default class AntColony {
  constructor(
    distances,
    n_ants,
    n_best,
    n_iterations,
    decay,
    alpha = 1,
    beta = 2,
	appState
  ) {
    this.distances = distances;
    this.pheromone = Array(distances.length)
      .fill()
      .map(() => Array(distances.length).fill(1 / distances.length));
    this.all_inds = Array.from({ length: distances.length }, (_, i) => i);
    this.n_ants = n_ants;
    this.n_best = n_best;
    this.n_iterations = n_iterations;
    this.decay = decay;
    this.alpha = alpha;
    this.beta = beta;
    this.best_length = Infinity;
    this.best_path = null;
  }

  run() {
    const all_paths = [];
    for (let i = 0; i < this.n_iterations; i++) {
      const iteration_paths = this.gen_all_paths();
      this.spread_pheromone(iteration_paths, this.n_best);
      this.decay_pheromone();
      all_paths.push(...iteration_paths.map((p) => p.path));

      if (i % 10 === 0) {
        console.log(`Iteration ${i}: Best path length: ${this.best_length}`);
      }
    }

    return {
      best_path: this.best_path,
      best_length: this.best_length,
      all_paths,
    };
  }

  gen_path_dist(path) {
    let total_dist = 0;
    for (let i = 0; i < path.length - 1; i++) {
      total_dist += this.distances[path[i]][path[i + 1]];
    }
    total_dist += this.distances[path[path.length - 1]][path[0]]; // Return to start city
    return total_dist;
  }

  gen_all_paths() {
    const all_paths = [];
    for (let i = 0; i < this.n_ants; i++) {
      const path = this.gen_path(0); // Start from city 0
      all_paths.push({ path, dist: this.gen_path_dist(path) });
    }
    return all_paths;
  }

  gen_path(start) {
    const path = [start];
    const visited = new Set([start]);
    let prev = start;

    for (let i = 0; i < this.distances.length - 1; i++) {
      const move = this.pick_move(
        this.pheromone[prev],
        this.distances[prev],
        visited
      );
      path.push(move);
      visited.add(move);
      prev = move;
    }

    return path;
  }

  pick_move(pheromone, dist, visited) {
    const pheromone_copy = [...pheromone];
    visited.forEach((v) => (pheromone_copy[v] = 0));

    const epsilon = 1e-10;
    const safe_dist = dist.map((d) => (d === 0 ? epsilon : d));
    let prob = pheromone_copy.map(
      (ph, i) =>
        Math.pow(ph, this.alpha) * Math.pow(1.0 / safe_dist[i], this.beta)
    );
    const prob_sum = prob.reduce((a, b) => a + b, 0);
    prob = prob.map((p) => p / prob_sum);

    return np_choice(this.all_inds, 1, prob)[0];
  }

  spread_pheromone(all_paths, n_best) {
    const sorted_paths = all_paths.sort((a, b) => a.dist - b.dist);

    for (const { path, dist } of sorted_paths.slice(0, n_best)) {
      for (let i = 0; i < path.length - 1; i++) {
        this.pheromone[path[i]][path[i + 1]] += 1.0 / dist;
        this.pheromone[path[i + 1]][path[i]] += 1.0 / dist; // Symmetric TSP
      }

      this.pheromone[path[path.length - 1]][path[0]] += 1.0 / dist;
      this.pheromone[path[0]][path[path.length - 1]] += 1.0 / dist;

      if (dist < this.best_length) {
        this.best_length = dist;
        this.best_path = path;
      }
    }
  }

  decay_pheromone() {
    this.pheromone = this.pheromone.map((row) =>
      row.map((p) => p * this.decay)
    );
  }
}

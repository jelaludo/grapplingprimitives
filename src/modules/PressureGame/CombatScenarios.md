/**
 * 3-Step Combat System
 * FLOW (takedown + passing)
 * PRESSURE (pinning)
 * FINISH (submission)
 */

const combatPhases = {
  Flow: {
    success: [
      // --- TAKEDOWN SUCCESS ---
      { name: "Double Leg Takedown", description: "A powerful shot drives through both legs!" },
      { name: "Single Leg Takedown", description: "A swift attack to one leg breaks the balance!" },
      { name: "Hip Throw", description: "A beautiful hip throw sends the opponent flying!" },
      { name: "Ankle Pick", description: "A sneaky grab at the ankle causes the fall!" },
      { name: "Duck Under", description: "A quick dip beneath the opponent's arm secures control!" },
      { name: "Outside Trip", description: "A strategic foot placement trips the opponent outward!" },
      { name: "Inside Trip", description: "A blocking leg sweep collapses the opponent inward!" },
      { name: "Knee Tap", description: "A precise block of the knee creates instant imbalance!" },
      { name: "TomoeNage", description: "Going down with a foot on the hip sent the opponent airborne" },
      { name: "SasaeTsurikomi", description: "A perfectly timed foot sweep send the opponent crashing down!" },
      { name: "Lateral Drop", description: "A sudden twist and drop sends the opponent sideways!" },
      { name: "Osotogari", description: "A powerful leg reap sweeps the opponent off their feet!" },
      { name: "Dangerous Kani Basami", description: "A scissoring leg attack with devastating effect!" },
      { name: "Russian-Tie Shoulder Drop", description: "A tight grip transitions to an unexpected drop!" },
      { name: "Blast Double", description: "An explosive takedown drives straight through!" },

      // --- PASSING SUCCESS ---
      { name: "Knee Slice Pass", description: "The knee slices through the guard like butter!" },
      { name: "Toreando Pass", description: "A swift bullfighter pass gets around the legs!" },
      { name: "Double Under Pass", description: "Using double underhooks to power through guard!" },
      { name: "Long Step Pass", description: "A technical long step secures the pass!" },
      { name: "Half-Guard Top", description: "Controlling from half-guard top creates passing opportunities!" },
      { name: "Over-Under Pass", description: "The classic over-under control smashes through resistance!" },
      { name: "Keenan Reverse Grip", description: "A distal pants grip creates unexpected angles!" },
      { name: "Lachlan Distal Grip", description: "An ankle grip leads to a dominant leg entanglement!" },
      { name: "Lovato HQ", description: "The headquarters position offers multiple passing options!" },
      { name: "Gordon Floating Pass", description: "A weightless floating sensation bypasses the hips!" },
      { name: "Leg Drag", description: "A powerful leg drag neutralizes the opponent's mobility!" },
      { name: "Kimura Trap", description: "landing past the leg in a T-Kimura!" },
      { name: "Boris Lock", description: "A tight-lock of the leg crushes all retention attempts!" },
      { name: "Crab Ride", description: "inverted knee control crawls into a dominant pass!" },
      { name: "Berimbolo", description: "A spinning inversion transforms into a devastating back take!" },
      { name: "X-Pass", description: "A quick x-pass breaks through the defense!" }
    ],

    draw: [
      // --- TAKEDOWN DRAW ---
      { name: "Clinch Battle", description: "Both fighters fall together locked in a clinch!" },
      { name: "Strenuous Grip Fight", description: "A wild scramble of grips leading to no advantage!" },
      { name: "Pull guard", description: "Tired from the stand-up tie, a fighter pulls guard" },
      { name: "Mutual Guard Pull", description: "Both fighters pull guard simultaneously!" },

      // --- PASSING DRAW ---
      { name: "Half Guard Battle", description: "Their retention skills equals my passing skills!" },
      { name: "Guard Recovery", description: "The guard is quickly recovered!" },
      { name: "50/50", description: "A seesaw going nowhere!" },
      { name: "Grip Stripping", description: "The grips are failing before then can be used!" },
      { name: "Leg Entanglement", description: "Both fighters get tangled in a leg battle!" }
    ],

    failure: [
      // --- TAKEDOWN FAILURE ---
      { name: "Sprawl Defense", description: "A perfect sprawl stops the takedown cold!" },
      { name: "Takedown Counter", description: "The takedown attempt is expertly defended!" },
      { name: "Sprawl and Spin", description: "A quick sprawl denies the takedown attempt!" },

      // --- PASSING FAILURE ---
      { name: "Guard Retention", description: "Excellent guard retention prevents the pass!" },
      { name: "Sweep Counter", description: "The passing attempt leads to a sweep attempt!" },
      { name: "Technical Stand-up", description: "A technical stand-up nullifies the pass!" }
    ]
  },

  Pressure: {
    success: [
      // --- PINNING SUCCESS (both after pass & failed pass) ---
      { name: "Side Control", description: "Heavy side control pressure pins the opponent!" },
      { name: "Mount Position", description: "A strong mount position is established!" },
      { name: "North-South Pin", description: "Controlling from the north-south position!" },
      { name: "Trap Triangle", description: "A pinning triangle locks the opponent in place!" },
      { name: "Scarf-Hold", description: "The classic kesa-gatame creates crushing pressure!" },
      { name: "Reverse Scarf-Hold", description: "The reversed scarf position squeezes the lungs!" },
      { name: "Crucifix", description: "A devastating crucifix control immobilizes the arms!" },
      { name: "Gift-Wrap", description: "His own arm wrapped around the neck packages the opponent!" },
      { name: "Cross-body Ride", description: "Riding diagonally maintains total dominance!" },
      { name: "Knee on Belly", description: "Knee on belly pressure keeps opponent pinned!" },
      { name: "Back Control", description: "Taking the back with both hooks in!" },
      { name: "Turtle Control", description: "Maintaining control over the turtle position!" },
      { name: "Front Headlock", description: "Securing a tight front headlock position!" }
    ],

    draw: [
      { name: "Transitional Battle", description: "Both fighters transition without advantage!" },
      { name: "Mutual Scramble", description: "Neither fighter can establish control!" },
      { name: "Slipping out", description: "Neither fighter can establish control!" },
      { name: "Creating Space", description: "Neither fighter can establish control!" },
      { name: "Stalemate Position", description: "The position reaches a stalemate!" }
    ],

    failure: [
      { name: "Pin Defense", description: "The pin attempt is skillfully defended!" },
      { name: "Escape Artist", description: "A beautiful escape from the pin attempt!" },
      { name: "Technical Stand", description: "Standing up to avoid being pinned!" }
    ]
  },

  Finish: {
    success: [
      // --- SUBMISSION SUCCESS (both after pin & failed pin) ---
      { name: "Armbar", description: "An armbar is locked in for the finish!" },
      { name: "Triangle Choke", description: "A triangle choke secures the victory!" },
      { name: "Kimura Lock", description: "The kimura grip leads to submission!" },
      { name: "Rear Naked Choke", description: "A rear naked choke ends the fight!" },
      { name: "Guillotine", description: "A swift guillotine choke catches the neck perfectly!" },
      { name: "Bow Arrow Choke", description: "The bow and arrow choke tightens with deadly precision!" },
      { name: "Ezekiel Choke", description: "The sleeve choke crushes the windpipe from any position!" },
      { name: "No-Gi Ezekiel", description: "A modified ezekiel works without the gi for the tap!" },
      { name: "D'Arce Choke", description: "The d'arce choke slides in for a tight squeeze!" },
      { name: "Ninja Choke", description: "A sneaky ninja choke appears from nowhere!" },
      { name: "Anaconda Choke", description: "The anaconda coils around for the submission!" },
      { name: "Cross Collar Choke", description: "Deep grips on the collar lead to unconsciousness!" },
      { name: "Loop Choke", description: "A circular loop choke traps the opponent!" },
      { name: "Americana", description: "The americana shoulder lock forces the tap!" },
      { name: "Omoplata", description: "A shoulder lock using the legs creates extreme pressure!" },
      { name: "Katagatame", description: "The arm triangle constricts from multiple angles!" },
      { name: "Wristlock", description: "A sudden wristlock catches everyone by surprise!" },
      { name: "Kimura", description: "The powerful kimura shoulder lock secures the win!" },
      { name: "Biceps Slicer", description: "The biceps slicer attack brings intense pain!" },
      { name: "Achilles Lock", description: "An achilles lock hyperextends the ankle joint!" },
      { name: "Aoki Lock", description: "The unorthodox aoki lock contorts the limbs!" },
      { name: "Woj Lock", description: "The complex woj lock traps multiple limbs at once!" },
      { name: "Kneebar", description: "A kneebar hyperextends the knee for a quick tap!" },
      { name: "Calf Slicer", description: "The calf slicer crushes muscle against bone!" },
      { name: "Inside Heel Hook", description: "A devastating inside heel hook destroys the knee!" },
      { name: "Outside Heel Hook", description: "The outside heel hook rotates for a quick submission!" },
      { name: "Twister", description: "The spinal twister contorts the back for a unique finish!" },
      { name: "Toe Hold", description: "A powerful toe hold cranks the foot for the win!" },
      { name: "Heel Hook", description: "A lightning-fast heel hook out of nowhere!" },
      { name: "Flying Armbar", description: "An unexpected flying armbar succeeds!" },
      { name: "Armpit Grip Armbar", description: "Your underhook is my armbar!" },
      { name: "No-Gi Ezekiel", description: "While pinned he wrapped his hands just so" },
      { name: "Baseball Choke", description: "One moment he was dominating, then dominated" },
      { name: "Komlock", description: "The arm was safe until is wasn't" },
      { name: "Calf Slicer", description: "the half-guard top wasn't that safe" },
      { name: "Guillotine Choke", description: "A quick guillotine reverses the match!" }
    ],

    draw: [
      { name: "Submission Defense", description: "The submission was not tight enough!" },
      { name: "Escape Sequence", description: "A series of submission attempts are foiled!" },
      { name: "Mutual Exhaustion", description: "Both Players have exhausted their arsenals" },
      { name: "Unusual Flexibility", description: "This is supposed to work on most foes..." },
      { name: "Time Expires", description: "Time runs out during the submission battle!" }
    ],

    failure: [
      { name: "Submission Counter", description: "The submission attempt is reversed!" },
      { name: "Defense Mastery", description: "Perfect defense stops all submission attempts!" },
      { name: "Survival Skills", description: "Surviving an onslaught of submission attempts!" }
    ]
  }
};

export default combatPhases;

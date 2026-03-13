"use client";

import Nav from "../components/Nav";
import { useState, useEffect } from "react";

// Abbreviate full month names to 3 letters, e.g. "February 2024" → "Feb 2024"
function abbrevPeriod(period: string) {
  return period.replace(
    /January|February|March|April|May|June|July|August|September|October|November|December/g,
    (m) => m.slice(0, 3)
  );
}

const timeline = [
  {
    period: "December 2025 - Present",
    tag: "ON A BREAK",
    role: null,
    company: null,
    description:
      "I'm on a break - travelling, introspecting, retrospecting and future-specting (yes, it's a word for now!)\n\nI have been having a blast in spending more time with the people I love and doing the things I have always wanted to do.\n\nBut I do realize that it's time for me to start looking at what's next - work and learn with a team I respect for a mission I believe in.",
    photo:"/photos/break.jpg",
  },
  {
    period: "February 2024 - November 2025",
    tag: "HANDS-ON MBA",
    role: "Head of Business",
    company: "Netrin",
    description:
      "I took a 180-degree turn from DevOps to help build Netrin, a D2C 0-to-1 fitness-tech startup, from the ground up.\n\nIt was a 'get your hands dirty' masterclass in D2C business.\n\nDealing with impostor syndrome was part of the daily routine, but turns out the antidote is just doing the thing anyway, and discovering you're actually pretty decent at it.",
    photo: "photos/netrin.jpg", 
  },
  {
    period: "October 2021 - December 2023",
    tag: "GOLDEN HANDCUFFS",
    role: "Principal Engineer",
    company: null,
    description:
      "The entire team from the previous startup moved on as a team here, a Danish hardware company, which was fantastic coz it's one of the best teams I've worked with.\n\nThe work-life balance was amazing but, the non-startup way of working just didn't work for me.\n\nStayed on for two years - the $$$ and work-life balance definitely helped but wasn't worth it.",
    photo: "photos/hbk.jpg",
  },
  {
    period: "March 2018 - September 2021",
    tag: "FOUND MY THING",
    role: "Site Reliability Engineer",
    company: "VIMANA",
    description:
      "Had just gotten back from Germany after my Master's and rejoined VIMANA coz it felt like home and I knew we were building a kick-ass product.\n\nWas a Scrum Master/Solutions Engineer for the first year - didn't love it nor did I hate it.\n\nSince I had a penchant for solving problems but not for coding and really loved responsibility, became a Site Reliability Engineer and surprise surprise, absolutely slayed!",
    photo: "photos/vimana-second.jpg",
  },
  {
    period: "October 2015 - February 2018",
    tag: "SCHENGEN AND A DEGREE",
    role: "Master's student",
    company: "TU Munich",
    description:
      "Did my Master's in Communications Engineering in TU Munich and I'm gonna answer the 3 questions\n\nWhy Master's? Easiest way to get a visa.\n\nWhy Comm. Engg? Easiest branch to get into, given my Bachelor's degree.\n\nWhy Munich? 1. Tuition fee was almost next to nothing, thereby no Damocle's sword 2. Far enough from Chennai 3. Opportunity to check out Europe",
    photo: "/photos/munich.jpg",
  },
  {
    period: "October 2013 - August 2015",
    tag: "LEAP OF FAITH",
    role: "Field Engineer",
    company: null,
    description:
      "Major leap of faith I took by accepting this offer but man, did it pay off or did it pay off?\n\nWorked with customer support, machine data pattern identification (was done on Excel in those days), wrote backend code and graduated to managing a very complex real-time rules engine in town!\n\nWorked and learned with the best team and the best boss, who is now my mentor, friend and drinking buddy.",
    photo: "/photos/vimana.jpg",
  },
  {
    period: "June 2012 - July 2013",
    tag: "FIRST JOB",
    role: "Software Engineer (duh!)",
    company: "Visteon",
    description:
      "Sat for off-campus placements and got thru to Visteon, aka Core Job coz taking up that Master's in Purdue would have been really expensive.\n\nWas known for my testing and debugging skills. People would literally borrow me from other teams to find a specific bug. Not a slight brag. A full one",
    photo: "/photos/visteon.jpg",
  },
];

export default function Timeline() {
  const [mode, setMode] = useState<"read" | "photos">("photos");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#1a0d36",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Nav isMobile={isMobile} />

      <main
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: isMobile ? "32px 20px 80px" : "48px 60px 100px",
          width: "100%",
        }}
      >
        {/* Header row */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            marginBottom: "64px",
            flexWrap: "wrap",
            gap: "20px",
          }}
        >
          <h1
            style={{
              fontFamily: "var(--font-dm-serif), serif",
              fontSize: "clamp(36px, 5vw, 60px)",
              fontWeight: 400,
              letterSpacing: "-0.03em",
              margin: 0,
              color: "#ffffff",
            }}
          >
            How I got here
          </h1>

          {/* Mode toggle */}
          <div
            style={{
              display: "flex",
              backgroundColor: "rgba(255,255,255,0.07)",
              borderRadius: "8px",
              padding: "4px",
              gap: "2px",
            }}
          >
            {(["read", "photos"] as const).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                style={{
                  padding: "8px 18px",
                  borderRadius: "6px",
                  border: "none",
                  cursor: "pointer",
                  fontFamily: "var(--font-dm-sans), sans-serif",
                  fontSize: "13px",
                  fontWeight: 500,
                  letterSpacing: "0.03em",
                  transition: "all 0.15s ease",
                  backgroundColor: mode === m ? "#7c3aed" : "transparent",
                  color: mode === m ? "#ffffff" : "rgba(255,255,255,0.45)",
                }}
              >
                {m === "read" ? "Read mode" : "Show photos"}
              </button>
            ))}
          </div>
        </div>

        {/* Timeline entries */}
        <div
          style={{
            position: "relative",
            // On mobile: left border acts as the timeline line
            borderLeft: isMobile ? "1px solid rgba(167,139,250,0.2)" : "none",
            paddingLeft: isMobile ? "20px" : "0",
          }}
        >
          {/* Desktop vertical line */}
          {!isMobile && (
            <div
              style={{
                position: "absolute",
                left: "192px",
                top: "10px",
                bottom: "10px",
                width: "1px",
                backgroundColor: "rgba(167,139,250,0.2)",
              }}
            />
          )}

          {timeline.map((item, i) => (
            <div
              key={i}
              style={
                isMobile
                  ? { paddingBottom: "40px", position: "relative" }
                  : {
                      display: "grid",
                      gridTemplateColumns:
                        mode === "photos" ? "184px 16px 1fr 220px" : "184px 16px 1fr",
                      gap: "0 24px",
                      paddingBottom: "52px",
                      alignItems: "start",
                    }
              }
            >
              {/* Mobile: dot on the left border */}
              {isMobile && (
                <div
                  style={{
                    position: "absolute",
                    left: "-25px",
                    top: "4px",
                    width: "10px",
                    height: "10px",
                    borderRadius: "50%",
                    backgroundColor: "#7c3aed",
                  }}
                />
              )}

              {/* Period — above content on mobile, left column on desktop */}
              {!isMobile && (
                <div style={{ textAlign: "right", paddingTop: "1px" }}>
                  <span
                    style={{
                      fontFamily: "var(--font-dm-sans), sans-serif",
                      fontSize: "14px",
                      fontWeight: 600,
                      color: "rgba(255,255,255,0.55)",
                      lineHeight: 1.4,
                    }}
                  >
                    {abbrevPeriod(item.period)}
                  </span>
                </div>
              )}

              {/* Dot column (desktop only) */}
              {!isMobile && (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    paddingTop: "5px",
                  }}
                >
                  <div
                    style={{
                      width: "10px",
                      height: "10px",
                      borderRadius: "50%",
                      backgroundColor: "#7c3aed",
                      flexShrink: 0,
                      zIndex: 1,
                      position: "relative",
                    }}
                  />
                </div>
              )}

              {/* Content */}
              <div>
                {/* Period shown above tag on mobile */}
                {isMobile && (
                  <span
                    style={{
                      fontFamily: "var(--font-dm-sans), sans-serif",
                      fontSize: "12px",
                      fontWeight: 600,
                      color: "rgba(255,255,255,0.4)",
                      display: "block",
                      marginBottom: "6px",
                    }}
                  >
                    {abbrevPeriod(item.period)}
                  </span>
                )}

                <span
                  style={{
                    fontFamily: "var(--font-dm-sans), sans-serif",
                    fontSize: "13px",
                    fontWeight: 600,
                    letterSpacing: "0.14em",
                    color: "#a78bfa",
                    display: "block",
                    marginBottom: "8px",
                  }}
                >
                  {item.tag}
                </span>

                {item.role && (
                  <p
                    style={{
                      fontFamily: "var(--font-dm-serif), serif",
                      fontSize: "18px",
                      fontWeight: 400,
                      letterSpacing: "-0.01em",
                      color: "#ffffff",
                      margin: "0 0 12px",
                    }}
                  >
                    {item.role}
                  </p>
                )}

                <div>
                  {item.description.split("\n\n").map((para, j) => (
                    <p
                      key={j}
                      style={{
                        fontFamily: "var(--font-dm-sans), sans-serif",
                        fontSize: "15px",
                        fontWeight: 400,
                        lineHeight: 1.7,
                        color: "rgba(255,255,255,0.6)",
                        margin: "0 0 10px",
                      }}
                    >
                      {para}
                    </p>
                  ))}
                </div>

                {/* Photo stacked below content on mobile */}
                {isMobile && mode === "photos" && (
                  <div
                    style={{
                      marginTop: "16px",
                      width: "100%",
                      height: "200px",
                      borderRadius: "8px",
                      overflow: "hidden",
                      border: "1.5px dashed rgba(167,139,250,0.3)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "rgba(124,58,237,0.06)",
                    }}
                  >
                    {item.photo ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={item.photo}
                        alt={item.tag}
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      />
                    ) : (
                      <span
                        style={{
                          fontFamily: "var(--font-dm-sans), sans-serif",
                          fontSize: "12px",
                          color: "rgba(167,139,250,0.4)",
                        }}
                      >
                        No photo yet
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Photo slot — desktop photos mode only */}
              {!isMobile && mode === "photos" && (
                <div
                  style={{
                    width: "200px",
                    height: "160px",
                    borderRadius: "8px",
                    overflow: "hidden",
                    border: "1.5px dashed rgba(167,139,250,0.3)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "rgba(124,58,237,0.06)",
                    flexShrink: 0,
                  }}
                >
                  {item.photo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={item.photo}
                      alt={item.tag}
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  ) : (
                    <div
                      style={{
                        textAlign: "center",
                        padding: "16px",
                        display: "flex",
                        flexDirection: "column",
                        gap: "6px",
                      }}
                    >
                      <span style={{ fontSize: "22px", opacity: 0.3 }}>+</span>
                      <span
                        style={{
                          fontFamily: "var(--font-dm-sans), sans-serif",
                          fontSize: "11px",
                          fontWeight: 500,
                          color: "rgba(167,139,250,0.55)",
                          lineHeight: 1.5,
                        }}
                      >
                        Drop a photo in{" "}
                        <code
                          style={{
                            backgroundColor: "rgba(124,58,237,0.2)",
                            padding: "1px 5px",
                            borderRadius: "3px",
                            fontSize: "10px",
                            color: "#a78bfa",
                          }}
                        >
                          public/photos/
                        </code>
                        <br />
                        then set{" "}
                        <code
                          style={{
                            backgroundColor: "rgba(124,58,237,0.2)",
                            padding: "1px 5px",
                            borderRadius: "3px",
                            fontSize: "10px",
                            color: "#a78bfa",
                          }}
                        >
                          photo: &quot;/photos/filename.jpg&quot;
                        </code>
                        <br />
                        in{" "}
                        <code
                          style={{
                            backgroundColor: "rgba(124,58,237,0.2)",
                            padding: "1px 5px",
                            borderRadius: "3px",
                            fontSize: "10px",
                            color: "#a78bfa",
                          }}
                        >
                          timeline/page.tsx
                        </code>
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

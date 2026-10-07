"use client";

import { useId, useState } from "react";
import {
  trainingDisciplines,
  trainingWeek,
  type TrainingDiscipline,
} from "@/data/training-week";
import "./training-calendar.css";

function DisciplineIcon({ discipline }: { discipline: TrainingDiscipline }) {
  return (
    <svg
      viewBox="0 0 28 28"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="tc-icon"
    >
      {discipline === "swim" && (
        <>
          <circle cx="20" cy="9" r="2.4" />
          <path d="m6 15 7-5 5 4m-5-4-3-5 7-2M3 20c2-2 4-2 6 0s4 2 6 0 4-2 6 0 4 2 5 0M3 24c2-2 4-2 6 0s4 2 6 0 4-2 6 0 4 2 5 0" />
        </>
      )}
      {discipline === "bike" && (
        <>
          <circle cx="7" cy="20" r="5" />
          <circle cx="22" cy="20" r="5" />
          <path d="m7 20 5-10 6 10H7m5-10h8l2 10M10 6h5m4-2h3l-2 6" />
        </>
      )}
      {discipline === "run" && (
        <>
          <circle cx="18" cy="5" r="2.6" />
          <path d="m8 13 5-4 5 5 5 1m-10-6-3 8 6 3-3 6m-3-9-4 5H2" />
        </>
      )}
      {discipline === "recovery" && (
        <path d="M21 20A10 10 0 0 1 9 5a10 10 0 1 0 12 15Z" />
      )}
    </svg>
  );
}

export function TrainingCalendar({ className = "" }: { className?: string }) {
  const [selectedId, setSelectedId] = useState(trainingWeek[0].sessions[0].id);
  const titleId = useId();
  const detailId = useId();
  const selectedDay = trainingWeek.find((day) =>
    day.sessions.some((session) => session.id === selectedId),
  )!;
  const selected = selectedDay.sessions.find(
    (session) => session.id === selectedId,
  )!;
  const metadata = trainingDisciplines[selected.discipline];

  return (
    <section
      className={`training-calendar ${className}`.trim()}
      aria-labelledby={titleId}
    >
      <header className="tc-header">
        <div>
          <p className="tc-eyebrow">TU SEMANA, DE UN VISTAZO</p>
          <h3 id={titleId} className="tc-title">
            Ejemplo visual de planificación
          </h3>
        </div>
        <span className="tc-example-stamp">SEMANA ORIENTATIVA</span>
      </header>

      <div className="tc-key" aria-label="Disciplinas del calendario">
        {(["swim", "bike", "run"] as const).map((discipline) => (
          <span key={discipline} className={`tc-key-item tc-${discipline}`}>
            <DisciplineIcon discipline={discipline} />
            {trainingDisciplines[discipline].label}
          </span>
        ))}
      </div>

      <div className="tc-week" aria-label="Ejemplo de lunes a domingo">
        {trainingWeek.map((day) => (
          <div
            key={day.day}
            className="tc-day"
            role="group"
            aria-label={day.day}
          >
            <div className="tc-day-heading" aria-hidden="true">
              {day.shortDay}
            </div>
            <div className="tc-day-sessions">
              {day.sessions.map((session) => (
                <button
                  key={session.id}
                  type="button"
                  className={`tc-session tc-${session.discipline}`}
                  aria-pressed={selectedId === session.id}
                  aria-controls={detailId}
                  aria-label={`${day.day}: ${trainingDisciplines[session.discipline].label}, ${session.title}${session.minutes ? `, ${session.minutes} minutos` : ""}. Ver detalle del ejemplo.`}
                  onClick={() => setSelectedId(session.id)}
                >
                  <DisciplineIcon discipline={session.discipline} />
                  <span className="tc-session-duration">
                    {session.minutes ? (
                      <>
                        {session.minutes}
                        <small>min</small>
                      </>
                    ) : (
                      <span aria-hidden="true">—</span>
                    )}
                  </span>
                  <span className="tc-session-name">{session.title}</span>
                  <span className="tc-session-short">
                    {trainingDisciplines[session.discipline].shortLabel}
                  </span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <p className="tc-select-hint">
        <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <path
            d="M4 3v11h12m-4-4 4 4-4 4"
            stroke="currentColor"
            strokeWidth="1.3"
          />
        </svg>
        Selecciona un entreno para ver cómo se organiza.
      </p>

      <div
        id={detailId}
        className="tc-detail"
        aria-live="polite"
        aria-atomic="true"
      >
        <div className="tc-detail-description">
          <div className="tc-detail-meta">
            <span className={`tc-detail-discipline tc-${selected.discipline}`}>
              <DisciplineIcon discipline={selected.discipline} />
              {metadata.label}
            </span>
            <span>
              {selectedDay.day}
              {selected.minutes ? ` · ${selected.minutes} min` : ""}
            </span>
          </div>
          <h4>{selected.title}</h4>
          <p>{selected.objective}</p>
        </div>
        <div className="tc-structure">
          <p className="tc-structure-label">ESTRUCTURA ORIENTATIVA</p>
          {selected.structure.length ? (
            <>
              <div
                className={`tc-structure-bar tc-${selected.discipline}`}
                aria-hidden="true"
              >
                {selected.structure.map((part) => (
                  <span key={part.label} style={{ flexGrow: part.minutes }} />
                ))}
              </div>
              <ol>
                {selected.structure.map((part) => (
                  <li key={part.label}>
                    <span>{part.label}</span>
                    <strong>{part.minutes} min</strong>
                  </li>
                ))}
              </ol>
            </>
          ) : (
            <p className="tc-recovery-note">
              El descanso también tiene su espacio en el calendario.
            </p>
          )}
        </div>
      </div>

      <p className="tc-example-note">
        Ejemplo ilustrativo, no un plan individual. Duraciones y cargas
        orientativas: tu entrenador las adapta a tu disponibilidad y a cómo
        respondes.
      </p>
    </section>
  );
}

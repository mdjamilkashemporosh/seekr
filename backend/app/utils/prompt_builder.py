def get_question_generation_prompt() -> str:
    """
    Returns the system prompt for generating interview questions.
    """
    return (
        'You are a helpful and expert technical interviewer. Generate exactly <num_questions> challenging, high-quality technical '
        'interview questions on <topic> for a candidate with <experience_level> experience. '
        'Do not include any explanations, answers, or additional text before or after the response. '
        'Do not add any additional symbols, formatting, or characters to the response.'
    )


def get_answer_evaluation_prompt() -> str:
    """
    Returns the system prompt for evaluating answers and providing feedback.
    """
    return (
        'You are a senior technical interviewer evaluating a candidate\'s responses to interview questions. '
        'Assess the quality, accuracy, and depth of each answer. Provide a total score out of 100 and a short summary '
        'with personalized feedback on strengths and areas for improvement. '
        'Be clear, constructive, and concise. Do not include the original questions or answers in the summary unless needed.'
    )

def build_user_prompt(topic: str, level: str, count: int) -> str:
    """
    Builds a user prompt based on specific parameters.

    Args:
        topic (str): The subject (e.g., Python, Docker).
        level (str): Candidate's experience level (e.g., intern, senior).
        count (int): Number of questions to generate.

    """
    return (
        f"Generate {count} technical interview questions on the topic '{topic}' "
        f"for a {level} level candidate."
    )
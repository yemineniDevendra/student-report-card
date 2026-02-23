from rest_framework import viewsets, status
from rest_framework.response import Response
from .models import Student
from .serializers import StudentSerializer

class StudentViewSet(viewsets.ModelViewSet):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer

    def create(self, request, *args, **kwargs):
        # Extract data from React
        data = request.data
        marks = int(data.get('marks', 0))
        
        # Calculate Grade
        if marks <= 449: grade, status_val = "Fail", "Fail"
        elif marks <= 499: grade, status_val = "Pass", "Pass"
        elif marks <= 549: grade, status_val = "Second Class", "Pass"
        elif marks <= 600: grade, status_val = "First Class", "Pass"
        else: grade, status_val = "Distinction", "Pass"

        # Save manually to ensure no field errors
        student = Student.objects.create(
            name=data.get('name'),
            age=data.get('age'),
            marks=marks,
            grade=grade,
            status=status_val
        )
        
        serializer = StudentSerializer(student)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
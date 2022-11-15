import io
import os
import tarfile
from typing import Container
from django.contrib.auth.backends import ModelBackend
from django.contrib.auth import get_user_model
from django.db.models import Q


UserModel = get_user_model()


class EmailBackend(ModelBackend):
    def authenticate(self, request, username=None, password=None, **kwargs):
        try:
            user = UserModel.objects.get(Q(username__iexact=username) | Q(email__iexact=username))
        except UserModel.DoesNotExist:
            UserModel().set_password(password)
            return
        except UserModel.MultipleObjectsReturned:
            user = UserModel.objects.filter(Q(username__iexact=username) | Q(email__iexact=username)).order_by('id').first()

        if user.check_password(password) and self.user_can_authenticate(user):
            return user


# Copy file to docker container
# def copy_to_container(container: 'Container', src: str, dst_dir: str):
#     """ src shall be an absolute path """
#     stream = io.BytesIO()
#     with tarfile.open(fileobj=stream, mode='w|') as tar, open(src, 'rb') as f:
#         info = tar.gettarinfo(fileobj=f)
#         info.name = os.path.basename(src)
#         tar.addfile(info, f)

#     container.put_archive(dst_dir, stream.getvalue())